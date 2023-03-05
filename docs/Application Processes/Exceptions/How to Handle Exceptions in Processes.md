# Handling Exceptions

## Introduction
This document continues from “How to add Actions to Application Processes” and describes how to handle exceptions that may be generated while processes, actions and states are running.

## **What are Exceptions ?**
Exceptions are errors that occur while executing code. They can arise for all sorts of reasons and need to be handled within processes in order to create robust applications. Enactor’s definition of an exception is basically the same as Java’s and we have added into Application Process diagrams special link types that are executed when exceptions are raised. 

# How to Handle Exceptions in Processes
The ability to implement exception handling as links on process diagrams makes something that is often very cumbersome to implement as code much easier. This approach normally means that it can be added towards the end of the development of a process or application rather than right from the start, which is generally the case with pure code. The flow of execution can be easily enhanced to accommodate exceptions, something that is again quite difficult in code, as exceptions tend to execute “upwards and outwards” rather than “along the line of execution”.

Exceptions can be produced, generally called “thrown”, within actions and states and also processes themselves. Exceptions can also be thrown by the runtime environment while executing actions and processes. For example functions and services that perform communications or database access will throw exceptions if connections are broken or a database function returns an error. 

## **Catching Exceptions**
When handling exceptions they are generally said to be “caught”. A characteristic of exceptions is that if they are not caught then they “bubble up” to the level above them. In code this means uncaught exceptions make their way up the call stack. Ultimately if there is no code to catch an exception then an application will exit. 

Enactor takes a similar approach within Application Processes. Any exception thrown in a process will bubble up to the calling process. This will continue until the top level process that was started and if still not caught the runtime will end the top process and, if appropriate, exit.

Exceptions are normally thrown by actions and the user interfaces associated with states. To catch these sorts of exceptions simply draw a link with *Outcome* set to *Exception* to whatever sequence you wish to be performed. In the example below any exceptions that might be thrown by the action *ValidateInput* are caught and follow the purple link to the message state Message.

![Untitled 2](./Images/Aspose.Words.c4167aa7-a7ba-44e3-a32e-1b71de3c9be7.008.png)

The same thing can be done at state level. This will catch exceptions raised by the state itself and also any exceptions raised by action being executed by that state. For example the diagram below will also catch exceptions raised by the *ValidateInput* action:

![Untitled](./Images/Aspose.Words.c4167aa7-a7ba-44e3-a32e-1b71de3c9be7.009.png)

It is also possible to catch all exceptions raised at process level by drawing a link from the process symbol:

![Untitled](./Images/Aspose.Words.c4167aa7-a7ba-44e3-a32e-1b71de3c9be7.010.png)


## **Exception Types**
When exceptions are raised they can be of any type that extends the Java type *Throwable*. It is possible in the exception links to conditionally branch on the class instance type of the exception using the *instanceof* EL function as a condition in the link. In the example below instances of *java.lang.Exception* follow a different path. Note that the runtime environment makes a state level variable called *exception* available, hence the use of *state.exception* in the example.

![Untitled](./Images/Aspose.Words.c4167aa7-a7ba-44e3-a32e-1b71de3c9be7.011.png)


As well as being able to distinguish exceptions based on their class type using EL conditions it is possible to specify an error code in the event type. For example an event type of *Exception.AlreadyExists* will only be followed if the exception has an error code of *“AlreadyExists”*. This is able to operate since most of the exceptions raised by the Enactor runtime, and actions we have developed, implement a Java interface called IException which has methods to inspect an error code which are used by the Enactor process and state handling runtime code. 

In the example below the exception link will only be followed if the exception has an error code of *“MissingData”*:





![Untitled](./Images/Aspose.Words.c4167aa7-a7ba-44e3-a32e-1b71de3c9be7.012.png)



## **Special handling of Exceptions in Error States**
In Application Process diagrams *Error States* are types of *Message State* that have special handling for Exceptions. It is possible to raise an exception with a translatable error message associated with it, which is then used by *Error State* to display that message. If there is no message associated with the exception then the message text details are taken from the state properties just like a normal *Message State*. In this way different error messages can be displayed without having to have different links and messages for each possible exception.

Internally *Error State* interprets an exception class call *LocalizedUIProcessException* which when raised can be initialized with message base and message id details. Many of Enactors actions and runtime elements raise exceptions as this type so that error messages are more easily displayed.


## **Raising Exceptions in Processes**
The action *UIThrowExceptionAction* can be used in processes to cause an exception to be raised. The type of exception that is thrown is a UIProcessException and parameters can be supplied to define the error code and message details.

The action *UIThrowProcessExceptionAction* is similar to the above except that it is a type of *UIEndProcessAction* and will end the current process and cause an exception to be raised in the calling process.


## **Raising Exceptions in your own Actions**
When writing actions in Java it is possible to throw any exception type that extends *UIProcessException* or *ApplicationProcessException*. Most Enactor actions raise *UIProcessException* or a derivative of *UIProcessException* called *LocalizedUIProcessException*. 

The following example action raises a *UIProcessException* if there is missing data:


![Untitled](./Images/Aspose.Words.c4167aa7-a7ba-44e3-a32e-1b71de3c9be7.013.png)


## **Logging Exceptions**
Generally when catching exceptions you will want to log details of the exception to the system log so that issues can be investigated. This is done with *UILogMessageAction* which will automatically log any exception details along with any message you define.

