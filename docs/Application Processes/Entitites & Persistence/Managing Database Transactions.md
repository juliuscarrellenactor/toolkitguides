# Managing Database Transactions

## Introduction
This document explains how manage the scope of database transactions within Application Processes using common actions.

## Session Management
All database access from within the Enactor platform is handled through an instance of a data access session class. This session object provides control over database transactions and data caching. When database access is required, a session must be opened and must be closed when the access is complete. During this session, a transaction must be started and either committed or rolled-back before finally closing the session. This simple example would be represented with the following flow:

![Screen shot 2011-09-30 at 15](Images/Aspose.Words.9143c96f-6217-4d0c-9f84-e6a2023853b3.008.png)

The session concept allows transactions to be managed across multiple systems or databases. By default the data access session provides support for transaction management using the standard Enactor database connection classes. These are able to use underlying classes for features such as database connection pooling and performance logging.

A database session is generally shared across all components that execute between the opening and the closing of that session; the session is held in a thread local variable and accessed through the *DataAccessContext* class. As a general rule classes (database servers, actions, etc) should be written to access the current data access session and shouldn’t manage the session lifecycle themselves.

A session can be explicitly opened or closed in processes, through the use of transaction management actions or through the use of session management options on action symbols within Application Processes. These options will be described in the following sections.

## **Database Transaction Actions**
Database transactions are controlled through a set of actions within *CommonUI* package and through toolkit support within the Application process Designer. The six key actions are described below.

### Begin Transaction Action
This action should be used from an Application Process to begin a transaction. If the process could potentially be nested within another process, then the *BeginNestedTransactionAction* should be used.

The action takes an optional parameter *enactor.mfc.logging.LogRollbackCalls*, which allows a logger to be attached and called whenever rollback is called. This is useful for monitoring a transaction and debugging. 

The action returns the data access session *enactor.commonUI.DataAccessSession* and the data access transaction *enactor.commonUI.DataAccessTransaction* but also will have setup a thread local data access session held in the *DataAccessContext* class. If the transaction is successfully started then a *Success* outcome will be returned. If a transaction already existed and was not at a transaction level of zero, then a *UIProcessException* is thrown with error code: *DatabaseError*.

### Commit Transaction Action
This action should be used to finally commit a transaction. It takes the data access transaction and optionally the session as inputs. If the session is not provided, then the data access session is retrieved from the thread local variable using the *DataAccessContext* class. It returns the session and transaction as outputs. 

If the transaction is successfully committed, then a *Success* outcome is returned. If rollback has been called at some stage during the transaction then a *Fail* outcome is returned. Otherwise, a *UIProcessException* is thrown with error code *DatabaseError*. The transaction level after running this action should have been returned to zero and the underlying database transaction should have been committed ok. If this is not the case then a *UIProcessException* is thrown with error code *DatabaseError*.

### RollbackTransactionAction
This action should be used to rollback a transaction. It takes the data access transaction and optionally the session as inputs. Like the commit function if the session is not provided, then the data access session is retrieved from the thread local variable using the *DataAccessContext* class. It returns the session and transaction as outputs. 

If the transaction is successfully rolled back, then a *Success* outcome is returned. Otherwise a *UIProcessException* is thrown with error code *DatabaseError*. The transaction level after running this action should have been returned to zero and the underlying database transaction should have been rolled back ok. If this is not the case then a *UIProcessException* is thrown with error code *DatabaseError*.

### Begin Nested Transaction Action
This action behaves in a similar way to the *BeginTransactionAction* but does not mandate that the transaction level is zero before being invoked. It should be used for beginning a transaction in a process that may be nested within a larger transaction.

### Commit Nested Transaction Action
This action behaves in a similar way to the *CommitTransactionAction* but does not mandate that the transaction level is zero after being invoked. It should be used for committing a transaction in a process that may be nested within a larger transaction.

### Rollback Nested Transaction Action
This action behaves in a similar way to the *RollbackTransactionAction* but does not mandate that the transaction level is zero after being invoked. It should be used for rolling back a transaction in a process that may be nested within a larger transaction.


## **Nested Transactions**
You will notice from reading the details of the above actions that they support nested transactions. This is required when there is a series of components that wish to share a transaction or components that themselves call other transactional components.

For example an application process called *UpdateCustomerAccount* might have the job of updating a customer account balance and other customer details. In order that this process can be used in multiple types of transaction that affects customer accounts it would need to be able to handle nested begin, commit and rollback functions.

In order to support both standalone and combined transactional components the database transaction itself can support being nested. It is possible to call *BeginTransaction* multiple times and each time a transaction level counter is incremented. Calling *CommitTransaction* or *RollbackTransaction* causes the level to decrease. Only when it returns to zero will the actual database transaction commit or roll back. The following diagram demonstrates this:



![Screen shot 2011-10-03 at 08](Images/Aspose.Words.9143c96f-6217-4d0c-9f84-e6a2023853b3.009.png)

If *Rollback* is called at any point in the transaction then the entire transaction will rollback when reaching zero. It is important, therefore, that if a failure occurs within a component and rollback is called that this is reported to the caller as an exception or failure response. In this way, the caller can stop subsequent processing which ultimately will be rolled-back. Using this approach, components can be easily reused without concern about where they fit in the transaction cycle.

### Action Session Management Control
When using actions that do database work within application processes you use the *Session Management Type* property to control how the action interacts with a data access session. Depending on the value of this property the platform will create or use the appropriate database session. This means that all actions can be written in the same way regarding database session and transaction management (see code example below) and the framework will look after opening and closing sessions.

The session management type is one of the properties set against an action:

![Screen shot 2011-10-03 at 12](Images/Aspose.Words.9143c96f-6217-4d0c-9f84-e6a2023853b3.010.png)


The action symbol will show an icon in the top left corner to indicate the selected option. 

The options are:

![Screen shot 2011-10-03 at 11](Images/Aspose.Words.9143c96f-6217-4d0c-9f84-e6a2023853b3.011.png)***None***

Flags that this action does not access the database or, if it does, it is not declaring that it does and no special handling will be taken by the framework.

![Screen shot 2011-10-03 at 11](Images/Aspose.Words.9143c96f-6217-4d0c-9f84-e6a2023853b3.012.png)

***Make new session***

The platform will make a new session for the action for accessing the database. If one already exists then a new one will be made and passed to the action and the original will be restored as the after processing this action. When the action commits the session will commit as there will be no nesting.

![Screen shot 2011-10-03 at 11](Images/Aspose.Words.9143c96f-6217-4d0c-9f84-e6a2023853b3.013.png)

**Make session if one does not exist**

This is often the most common option used when writing processes that do database access. The platform will make a session if one is not available. The session will be available to subsequent actions. If a session is made then when the action commits the session will commit as there will be no nesting.

![Screen shot 2011-10-03 at 11](Images/Aspose.Words.9143c96f-6217-4d0c-9f84-e6a2023853b3.014.png)**Manages own session**

The platform will not control the session for this action. It is the responsibility of the action to control this.

![Screen shot 2011-10-03 at 11](Images/Aspose.Words.9143c96f-6217-4d0c-9f84-e6a2023853b3.015.png)

**Needs existing session**

The action requires a session and will error if one is not available.


# Application Process Examples
## **Standard Process Example**
The example below shows the use of begin, commit and rollback actions in an Application Process. It shows the use of a reusable sub process, which operates a nested transaction.

 ![Screen shot 2011-10-03 at 12](Images/Aspose.Words.9143c96f-6217-4d0c-9f84-e6a2023853b3.016.png)

Note all exceptions from the state *InTransaction* within the transaction cause a rollback. 

Also note that the *DoNonTransactionalDBWork* action will commit regardless of the main transaction because it is has been flagged using the *Make New Session* type. This is useful for logging to the database. However it should be used with caution if accessing data which is accessed in the main transaction as it will increase the chance of database contention on these resources and might lead to inconsistent data being written to the database.

## **Reusable Sub Process Example**
The example below is a subprocess that can be used within multiple outer processes such that it will participate in overall transactions. Note the use of the *BeginNestedTransaction*, CommitNetedTransaction etc…

![Screen shot 2011-10-03 at 12](Images/Aspose.Words.9143c96f-6217-4d0c-9f84-e6a2023853b3.017.png)


# Transaction Management code in Actions

All code designed to perform database operations requires an open database transaction. Components should therefore include code to control when precisely a transaction should begin and when it should be committed or rolled-back. In actions this can be done as follows:

`   `**boolean** success = **false**;

`   `IDataAccessSession session = **null**;

`   `IDataAccessTransaction transaction = **null**;

`   `**try** {	    	 

//Create a database session

`	`session = DataAccessContext.getCurrentSession();



`	`//Create a transaction

`	`transaction = session.beginTransaction();

Do some database work….


//Commit the transaction

`	`transaction.commit();



`	`success = **true**;



`   `} **catch** (Throwable t) {

`	`*logger*.log(Logger.***LOG\_ERROR***, "Error performing database functions", t);

`   `} **finally** {

`	`**if** (!success && transaction != **null**) {

`	    `**try** {

`		   `transaction.rollback();

`	    `}

`	    `} **catch** (DatabaseException de) {

`	    `}

}

`	`**if** (session != **null**) {

`	    `**try** {

`		`session.close();

`	    `} **catch** (DatabaseException de) {

`	    `}		

`	`}

`   `}

Notice the use of *DataAccessContext.getCurrentSession(*). This example gets access to the current database session but neither opens or closes it. Notice also that the commit and rollback is done within a finally block. It is essential that this code is executed before leaving the function.

If the above example code is used in your actions that do database work then the framework *Session Management Type* configuration against actions should work correctly with the framework.
