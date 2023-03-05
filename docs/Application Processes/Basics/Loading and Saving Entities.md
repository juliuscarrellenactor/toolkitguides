# Loading & Saving Entities

## **Transactions**
The actions described following can all operate without the need for considering database transactions. Used in isolation each operation will take place within its own transaction. Database transaction management is covered in a separate How To Guide.

# Using the standard Actions

## **Creating an Entity Key**
All entity access requires the entity’s key to identify the particular record in the database. Often this key can be referenced from a property on an entity that is already in a process’s data. 

The following example shows the creation of a user key and setting of the user id on it. The pair of actions can be created simply by searching for the key using the *Resource Library*, a *UserKey* in this case, and dragging it onto the process.

![Screen shot 2011-09-20 at 15](Images/Aspose.Words.207d6dd0-a81c-4cfd-acf5-213f9e75500b.009.png)

For example to load an entity from scratch use *CreateEntityKeyAction* to create a blank key object using the entity name and namespace and then use the *LoadEntityAction (we* use the one in the *CommonUI* library normally*).*

### Checking that an Entity Exists
In order to check if an entity exists within a database the *CheckEntityExistsAction* can be used. This action takes the key of the entity to check for as an input *(enactor.coreUI.Key*). The action will return an outcome of *Success* if the entity does exist or *Fail* if not. The action does not have any outputs. If for some reason access to the database fails, an exception is thrown by the action. The exception will be of type *LocalizedError.*

## **Loading an Entity**
Entities should be loaded from the database using the *LoadEntityAction* whether the data is for reading or editing. This action takes the key of the entity to load as an input (*enactor.coreUI.Key*). On successfully loading the entity, a *Success* outcome is returned and the key and the loaded entity (*enactor.coreUI.Entity*) are output. If the entity is not found or access to the database fails then an exception is thrown by the action. The exception code will generally be one of the codes listed in Appendix 3 – Database Error Codes***.

By default entities loaded in this way will be written to an entity cache. This cache will described in more detail later, but essentially means that subsequent reads of the same data within a given time period will be served from an in memory cache rather than the database.

A variant of the *LoadEntityAction* is provided called the *LoadEntityLenientAction* which should be used if it is expected that an entry might not exist or if the passed in key may be blank. If the entity does not exist instead of raising an exception, this action returns an outcome of *NoSuchRecord*. It the passed in key is blank then an *InputEmpty* outcome is returned.

## **Saving an Entity**
Entities should be saved to the database using the *SaveEntityAction* whether the entity is new and to be inserted or an update to an existing entity. The action takes the entity to be saved as an input (*enactor.coreUI.Entity*). If the entity is successfully saved, it returns *Success* outcome. It has no outputs. 

If for whatever reason the save fails an exception is thrown. The main possible exceptions are listed in the Database Exceptions section.


The save action essentially invokes a select query on the database to check if the entity already exists and then an insert or update depending on the response. The entity will also be cleared from the entity cache during the save process.

## **Deleting an Entity**
Entities should be deleted using the *DeleteEntityAction*. This action takes the key of the entity to delete as an input (*enactor.coreUI.Key*). If the entity is successfully deleted then a *Success* outcome is returned. 

If the entity does not exist then a *NotFound* outcome is returned. For all other failures either a *Fail* outcome is returned or an exception is thrown. The main possible exceptions are listed in the Database Exceptions section.

The entity will be cleared from the entity cache during the delete process.
###
## **Database Transactions**
As already described the actions described will automatically commit their changes to the database as they run. They can also participate in transactions that involve multiple operations. How to do this is described in *How To Control Database Transactions in Application Processes*.

## **Example**
The following example checks to see if an entity exists. If it does it loads it; changes a property; saves it and then finally deletes it. 

Notice that the create entity action creates entities but in this case it is creating an entity key which itself is actually just another entity. 

Notice the mapping its output from type *enactor.coreUI.Entity* to *enactor.coreUI.Key* before it can be used to load the full entity. Mappings are covered in a separate How To Guide.


![A screenshot of a cell phone Description automatically generated](Images/Aspose.Words.207d6dd0-a81c-4cfd-acf5-213f9e75500b.010.png)


# Writing your own database actions
## **Your own database action**
You can easily write your own action to manipulate entities and manipulate them in the database. For example here is an example that creates an entity, writes it to the database and then deletes it. 

![A screenshot of a social media post

Description automatically generated](Aspose.Words.207d6dd0-a81c-4cfd-acf5-213f9e75500b.011.png)


The basic steps in the above code are as follows:

1. Get the *SchemaManager* to check that the table(s) for the entity exist and are up to date. This work would generally be is start up or maintenance code and can also be configured to happen automatically (by configuring the *SchemaUpdateHandler* to run in the *packages.xml* file).

2. Look to see if there is already a database session open. If so use it, otherwise create one. This allows multiple actions that manipulate the database to be chained together in an Application Process and then each of the different updates committed in one go (this operates with a top level *beginTransaction()* action then a set of actions like this one and finally a *commit()* with ).

3. Create an entity server for access to methods such as *save()*, *load*() and *delete().*

4. Create and entity, set some properties and save it. In the example above the entity definition will have previously identified that the property *customerId* is the main key into the data.

5. Load the entity using an entity key with the *customerId* set.


# Locking
## **Persistent Locking**
When editing data stored in the database typically an entity is loaded and displayed to a user and changes are subsequently saved or cancelled. While this data is being edited it makes sense to stop other users from editing the same record. The edit process may take several minutes so it is unrealistic and bad practice to try and protect this edit session using a low level database lock. 

An alternative is provided in the form of a persistent lock record. A lock entry is made at the start of an edit session and released at the end. It holds information about who is editing a record and where. The lock is limited to a certain time period, defaulting to ten minutes. The actions that support the lock process are described below.

### CheckForLockAction
This takes the entity key (*enactor.coreUI.Key*) and signed on user (*enactor.coreUI.User*) as inputs. Also optionally takes an endpoint reference (enactor.coreUI.EndpointReference) if the persistent lock is recorded remotely. 

Returns *Locked* outcome if a lock already exists by a different user that has not timed out otherwise *Unlocked*. Also outputs a *enactor.commonUI.Locked* variable as a Boolean.

### LockEntityAction
Takes the entity key (*enactor.coreUI.Key*) and signed on user (*enactor.coreUI.User*) as inputs. Also optionally takes the lock timeout (*enactor.coreUI.LockTimeout*) in milliseconds and endpoint reference (*enactor.coreUI.EndpointReference*) if the persistent lock should be recorded remotely for example. It returns an outcome of *Success* if the lock is made otherwise *Fail*.

### UnlockEntityAction
Takes the entity key (*enactor.coreUI.Key*) and signed on user (*enactor.coreUI.User*) as inputs. Also optionally takes the endpoint reference (*enactor.coreUI.EndpointReference*) if the persistent lock should be recorded remotely for example. 

It returns an outcome of *Success* if the unlocking is successful otherwise *Fail*.

### Persistent Lock Viewer
It is possible to monitor and clear persistent locks using the *Persistent Lock Maintenance* application under the *Administration* menu of the Estate Manager / Back Office application. For example:

![A screenshot of a social media post Description automatically generated](Images/Aspose.Words.207d6dd0-a81c-4cfd-acf5-213f9e75500b.012.png)

Note that the Back Office and Estate Manager configuration and maintenance applications tend to use different versions of the actions described above so that functions like checking persistent locks are done automatically. These are described in the How To Guides on creating and extending Maintenance Applications.

# Caching
## **Entity Cache**
Within an application all entities that are loaded using the actions detailed above make use of the *EntityCache*. This is a static cache that holds unmodified data only. 

![A close up of a card Description automatically generated](Images/Aspose.Words.207d6dd0-a81c-4cfd-acf5-213f9e75500b.013.png)

By default, it stores the original entity in memory for period of time (60 seconds normally and 1 second in development mode). When subsequent load requests for the same entity (identified by its key) are made a byte level copy of the original entity will be made and returned. In this way, any modifications will not affect the original entity. 

After a period the loaded entities timeout. A background expiry thread clears old cache entries as and when they expire. When an entity is saved, its entry in the cache is removed so that subsequent loads will be forced to retrieve the latest copy from the database.

Two extended load actions are provided (*ExtendedLoadEntityAction* and *ExtendedLoadEntityLenientAction*) that allow bypassing of the cache by setting an *enactor.coreUI.UseEntityCache* input variable to false. With this set, data will always be loaded from the database.

## **View Cache**
The extended actions described above also allow use of a view level cache. This can be enabled by setting the *enactor.coreUI.UseViewCache* variable to true. A view cache is an in memory cache that is associated with the view rather than the whole application. 

Typically this will be used to create a cache with a longer timeout or change the cache mode, say to *UNSAFE* mode to increase performance where it is known that only unmodified data will ever enter the cache. In a web application this enables different caching by user rather than across the whole web application.

Initialising a view cache is done using the *InitialiseViewEntityCacheAction*. It takes the following parameters:

*enactor.commonUI.CacheMode*

*FULLY\_SAFE*		Entity copies are taken for every read

*THREAD\_SAFE*		Entity copies are held by thread

*UNSAFE*			Single Copy is shared for all threads

*enactor.commonUI.CacheExpiryMs*

Expiry time in milliseconds for the cache entries

*enactor.commonUI.CacheMaxEntries*

Maximum number of entries in the cache before oldest will be pushed out

## **Custom Server classes**
Access to the database is performed using Java classes that we call “servers”. There tends to be one of these classes for each type of entity. For example Products has a ProductDBServer and Customers has a CustomerDBServer. These are typically created and used based on the entity name and namespace information since there is generally a direct relationship i.e. given an entity name the system can derive the server name. 

In certain circumstances, for example where a custom database server class is required, it is necessary to provide the name server class to be used to the load and save actions. This is available as an option on the extended versions of the actions as a parameter (*enactor.coreUI.EntityServerName*). Note that this value takes the *QName* of the server to use for the operation not the java classname. The java classes that implement servers are registered with their QNames in the Packages.xml files that go with an application package.

### Remote database access
All access using the standard four actions described above is to a local database. The extended set of actions described above allow for an endpoint reference to be supplied (*enactor.coreUI.EndpointReference*). This allows access to data over using, say, a web service call if the endpoint provided is a SOAP endpoint. Endpoints are resolved from drawings that represent the technical topology of the system configuration. We call them *Process Connections* diagrams. This is covered in detail in another How To Guide. 

# Appendix – Database Error Codes
Database error codes are defined in the file *DatabaseErrorCodes.java.* The main ones are listed below:

InvalidKey

AlreadyExists

InvalidLoginDetails

FailedToDecrypt

FailedToDelete

FailedToEncrypt

FailedToSave

FailedToReserve

FailedToLoad

FailedToConnect

FailedToCreate

FailedToUpdate

FailedToInsert

FailedToPost

FailedToLookupGUID

ItemTooOld

InvalidData

InvalidXml

NoLongerImplemented

UnsupportedOperation

TableDoesNotExist

IndexDoesNotExist

IndexCannotBeDropped

SequenceDoesNotExist

ObjectAlreadyExists

FailedToBeginTransaction

FailedToCommitTransaction

FailedToRollbackTransaction

UnknownListMethod

FailedToCreateStatement

InvalidDataAccessSession

CommitCalledOutsideTransaction

RollbackCalledOutsideTransaction

ConfigurationError

SQLException

InvalidSQL

FailedToLoadMetaData

FailedToLoadFilterData

NoEntityMapping

InvalidEntityMapping

NoDatabaseServer

FailedToList

FailedToGetConnection

MustBeTimestampedEntity

NoCurrentSession

NoCurrentConnection

MustHavePurgeDateMapping

Unsupported Database

SessionAlreadyOpen

CommitCalledOnRolledBackTransaction

InvalidServerName

InvalidServerType

TransformFailed

DataOlderThanCurrent

FailedToIndexData

ItemDoesNotExist

UnknownServer

UnknownEntity

UnknownListFilter

LockedByUser
