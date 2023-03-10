# Background Services
An Application Process may execute as a Background Service. Background Services allow an Application to conveniently delegate tasks to a separate stream of Processing, which may execute within the same Application or in a separate Application running on the same or a different Server. The means by which delegation of the task is communicated to the Background Service depends on the context. 

Using a Background Service may serve to free up the main Application Processing Stream allowing it to attend to higher priority function such as engagement with the User Interface, or address performance or scaleability considerations. Using a Background Service allows the Designer to encapsulate a particular aspect of processing in a separate Application dedicated specifically to the function and to attend to all its requirements for audit trail, sequence number integrity, data preservation and so on, improving robustness, maintainability and reliability of the function and the Application(s) it serves.
## Background Service Infrastructure
The Enactor Tools and Platform include a built-in infrastructure for the design of Background Services, which includes a ***Services Manager*** and an API consisting of a suite of related Actions. These elements implement the Service and provide Service Management access to it. Multiple, individual Services may be registered with the Services Manager, each with a Unique **ServiceId** by which they can be referenced when using Actions of the API. This Chapter describes the elements of this infrastructure and their use and includes an example, which is also downloadable from the website.
## The Services Manager
A Background Service can be created as part of an Application by first creating the Application Process then adding code to the main Application Class to create a BackgroundServiceView object in which it will execute as follows:

![Graphical user interface, text Description automatically generated](./Images/Aspose.Words.7fea757c-113b-4cad-bfff-25432cc47c2f.001.png)

The Background Service View can be registered as a listener to the Main Application View and will also receive Events sent to the Main View:

mainView.addViewListener(**BackgroundServiceExample**.this);

A ***ServicesManager*** is an implicit element of the Background Service Infrastructure, which is itself managed by the Infrastructure and is created, if it doesn’t already exist, when the BackgroundServiceView is created. The new Background Service is also registered with it.


## Accessing Background Services
The ***ServicesManager*** is the means by which the Application may identify and obtain access to the Registered Background Services. The *ServicesManager* provides a consistent *IService* based interface for starting and managing different types of Service implementation. This interface includes a ***ControlService*** Object, which is provided as Input to the Background Service Process when executed by the ServiceManager and serves to share status of the Service between the *ServicesManager* and the Service Process itself. This object is transparent to the Application as user of both the Service and the Services Manager. An Application obtains a list of the Background Services available to it using the ***UIListServicesAction***.
### **The UIListServicesAction**
An Application Process that will manage a Background Service (for Start, Stop, Pause and Resume) will first obtain a list of the Background Services available, in which to identify and select the Service it will manage.

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.7fea757c-113b-4cad-bfff-25432cc47c2f.002.png)

The UIListServicesAction

This action returns a list of the Services registered with the Services Manager. Specifying the ServicesManager Input is optional; the (default) ServicesManager from which the List was obtained is returned as Output and can be used in the Actions that manage a selected Service. The entries in the List are Service Description objects, the properties of which may be used for User Identification and Selection (typically Name) may be identified using the Expression Builder. Full Classname is com.enactor.coreUI.actions.UIListServicesAction.


## Control of Background Services

The set of Actions described in this section provide access to a selected Background Service to direct the *ServicesManager* to Start, Stop, Pause and Resume the Service. These directions are communicated to the Background Service using the *ControlService* Object, which the Service uses to identify directions to change Status and updates the Service Current Status accordingly.

### **The StartServiceAction**

An Application Process that is managing a Background Service uses this Action to Start the Service.

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.7fea757c-113b-4cad-bfff-25432cc47c2f.003.png)

The StartServiceAction 

This action communicates a direction to the ServicesManager to Start the specified Service. If the Background Service has been Registered with the ServicesManager but not already executed, the ServicesManager will execute the Background Service Application Process. Full Classname is com.enactor.coreUI.actions.StartServiceAction.


### **The PauseServiceAction**
An Application Process that is managing a Background Service uses this Action to Pause the Service.

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.7fea757c-113b-4cad-bfff-25432cc47c2f.004.png)|

The PauseServiceAction

This action communicates a direction to the ServicesManager to Pause the specified Service. If the Background Service has been Registered and Started with the ServicesManager, the ServicesManager will issue the direction to Background Service Application Process by updating its ControlService Object.Full Classname is com.enactor.coreUI.actions.PauseServiceAction.


### **The ResumeServiceAction**
An Application Process that is managing a Background Service uses this Action to Resume the Service.

|![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.7fea757c-113b-4cad-bfff-25432cc47c2f.005.png)|<p>The ResumeServiceAction</p><p>This action communicates a direction to the ServicesManager to Resume the specified Service. If the Background Service has been Registered and Started with the ServicesManager, the ServicesManager will issue the direction to Background Service Application Process by updating its ControlService Object.</p><p>Full Classname is com.enactor.coreUI.actions.ResumeServiceAction.</p>|


### **The StopServiceAction**
An Application Process that is managing a Background Service uses this Action to Stop the Service.

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.7fea757c-113b-4cad-bfff-25432cc47c2f.006.png)|

The StopServiceAction

This action communicates a direction to the ServicesManager to Stop the specified Service. If the Background Service has been Registered and Started with the ServicesManager, the ServicesManager will issue the direction to Background Service Application Process by updating its ControlService Object.Full Classname is com.enactor.coreUI.actions.StopServiceAction.


## Background Services Status Communications
Each Background Service registered with the *ServicesManager* is associated with a *ControlService* Object, which stores and serves to communicate current Status of the Service and Directions to Change Status between the *ServicesManager* and the Service.

As the Application Process of the Background Service executes, usually a looping process, it checks the *ControlService* Object with each cycle of execution. Outcomes of the *CheckControlServiceStatusAction* determine the course of Process execution. On Outcomes to **Pause**, **Resume** or **Stop** the service uses set Actions to change its status. With the Stop Outcome the Process also clears the Current Activity information also managed in the *ControlService* Object and ends the Process. A **Wait** Outcome indicates the Service is in a Paused state and should wait some defined period. An **Error** Outcome indicates a Status Error condition and the Service should Wait then return to the Execution Cycle. This section describes the actions involved in this Background Service execution cycle. On the **Run** Outcome the Service performs its Service Function.


### **The SetControlServiceAsRunningAction**
This action initialises the *ControlService* Object when the Background Service Application Process execution initiates, typically as an action on the State Entered Process Flow from the initial State or from the Resume Outcome of the *CheckControlServiceStatusAction* described following.

![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.7fea757c-113b-4cad-bfff-25432cc47c2f.007.png)

The SetControlServiceAsRunningAction

This action changes the Status of the Service in the ControlService Object of its Input Item to Running. When the ServicesManager executes the Application Process of the Background Service the Process calls this Action to set its initial State. Calls to the CheckControlServiceStatusAction in this State return the Run Outcome, upon which the Service Function is performed. The Full Classname is: com.enactor.coreUI.actions. SetControlServiceAsRunningAction.

### **The CheckControlServiceStatusAction**
The Application Process of a Background Service uses this Action to check the *ControlService* Object with each cycle of execution. Outcomes of the *CheckControlServiceStatusAction* determine the course of Process execution.

![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.7fea757c-113b-4cad-bfff-25432cc47c2f.008.png)

The CheckControlServiceStatusAction

This Action applies to the the ControlService Object of its Input Item to determine an Outcome. Its Outcomes are subject to the Status and any Change Status Directions represented in the ControlService Object and select the Process Flows of the Service. This delivers both Status-dependent execution of the Service and control of the Service via the ServiceManager as communicated in the ControlService Object. Full Classname is: com.enactor.coreUI.actions.CheckControlServiceStatusAction.

#### **Service CurrentActivity**

While the Service Status is Running, the ***CheckControlServiceStatusAction*** returns a ***Run*** outcome with each cycle of execution. Within the context of the given Status the service may also set the ***currentActivity*** property of the *ControlService* Object to reflect a lower level of detail of the activity of the Service. This property can be set to indicate if the Service is currently Stopped or Paused but may also reflect stages of execution within a given Execution Cycle. By this means, the *ControlService* Object may be used to communicate Service Activity information to another Application such as a Service Manager Application or to a User Interface in in which to monitor the service. 
The *CheckControlServiceStatusAction* is described in the context of ***Stopping the Background Service***.


### **The SetControlServiceAsPausedAction**

The Application Process of a Background Service uses this Action change the Status in its *ControlService* Object to Paused.

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.7fea757c-113b-4cad-bfff-25432cc47c2f.009.png)

The SetControlServiceAsPausedAction

This Action updates the ControlService Object of its Input Item to reflect a new Status of Paused. Calls to the CheckControlServiceStatusAction in this State return the Wait Outcome, upon which the Service Function performs its Paused behaviour, which is typically an extended Wait Action. This execution cycle will repeat until a call to the CheckControlServiceStatusAction returns either Resume, in which case SetControlServiceAsRunningAction will reset Status to Running or Stop, in which case the Service will be Stopped. Full Classname is: com.enactor.coreUI.actions.SetControlServiceAsPausedAction.

### **Stopping the Background Service**

When the Application Process managing the Background Service calls the *StopServiceAction* the *ControlService* Object is updated to communicate a direction to the *ServicesManager* to Stop the Service. Within the Service Application Proces, in this condition, a call to the *CheckControlServiceStatusAction* returns the Stop Outcome. The Process Flow of this Outcome calls the *SetControlServiceAsStoppedAction* to change its Status to Stopped then the SetControlServiceCurrentActivityAction to initialise Current Activity Information held in the *ControlService* Object before terminating the Process. The *ControlService* Object is retained in the ServicesManager and returns to use if the Service is started. These Actions are described following.

#### **The SetControlServiceAsStoppedAction**

The Application Process of a Background Service uses this Action change the Status in its *ControlService* Object to Stopped.

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.7fea757c-113b-4cad-bfff-25432cc47c2f.010.png)

The SetControlServiceAsStoppedAction

This Action updates the ControlService Object of its Input Item to reflect a new Status of Stopped. Calls to the CheckControlServiceStatusAction in this State are not expected and the Outcome is undefined (probably an Error Outcome). Full Classname is: com.enactor.coreUI.actions.SetControlServiceAsStoppedAction.


#### **The SetControlServiceCurrentActivityAction**

This Action is used to set a ***currentActivity*** property of the *ControlService* Object to reflect a lower level of detail of the activity of the Service. The property be set to indicate if the Service is currently Stopped or Paused but may also reflect stages of execution within a given Execution. The Application Process of a Background Service uses this Action set the *currentActivity* property in its *ControlService* Object. When the Service is being Paused, or in this case Stopped the property can be set to reflect inactivity.

|![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.7fea757c-113b-4cad-bfff-25432cc47c2f.011.png)|The SetControlServiceCurrentActivityAction

This Action updates the ControlService Object of its Input Item to initialise initialise or specify a value for the currentActivity property of the ControlService Object supplied to it in its Input Item. A Message Text or Message Code and Base may also be supplied as inputs; the Message is stored in the ControlService Object and used to communicate the status of the Service in the User Interface or other monitor application as required. Full Classname is: com.enactor.coreUI.actions.SetControlServiceCurrentActivityAction.

# Example – Background Services
The ***BackgroundServiceExample*** is available for download from the website. The Application is fundamentally the same as the ‘Hello Enactor’ template Application created by the Swing Application Wizard but has been enhanced to include a Background Service, which performs a supplementary function to record each exercise of the ‘Hello Enactor’ function with a timestamp. A Call Process Action added to the ‘Hello Enactor’ Process Flow writes the Name used to create the Message into a text file, which provides the interface to the service. The Background Service reads and erases the interface file, appends a timestamp to the entry then appends it to an Output file. Two Button Events added to the Main Prompt UI of the Application provide access to a Service Manager and a List Service Results Process. The example is contrived, in order to illustrate all aspects of Background Service Infrastructure in a single Application but the Background Service Infrastructure is fully exercised.

The Enactor Tools Platform has a **Queues** and **Messaging Infrastructure**, which is normally used for communication between Applications and their Background Services, which typically execute in a separate Application, perhaps on a separate Server. This infrastructure is discussed and illustrated in the context of Connections Diagrams, as the subject of the next Chapter. However, using the the text file-based communication in this example conveniently highlights the ***WriteStringToFileAction*** and the ***WriteFile*** and ***ReadFileToString*** Actions, which enable a simple alternative. Although in this mechanism, entries can be lost if the service input file is overwritten before being processed by the Service; this is not a risk associated with using Queue-based systems.

The **Manage Background Service** option of the UI and the *ManageBackgroundService* Process of the Call Process action on its Process Flow also need not be in the same application but serves to illustrate the Actions and operation of the Service Management API of the Infrastructure.

The **Background Service Output** option of the UI and the *ListServiceResuolts* Process are provided only to exhibit the action of the Background Service; with a Delete option to re-initialise the output file.

This section describes the construction of the example. The key elements that illustrate ***Accessing Background Services*** and ***Control of Background Services*** are implemented in the Application Process ***ManageBackgroundService*** and the use of elements described in the section on ***Background Services Status Communications*** are implemented in the Application Process ***ExampleService***
## Creating the Basic Application
The example development begins by using the Swing Application Wizard as described in Chapter 2 in section ***The Swing Application Wizard*** to create the ***BackgroundServiceExample*** Application. This application can be executed immediately.

New and modified Page definitions are required by this Application and since Page Definitions are not discussed until Part II the Designer is best to copy these from the supplied Example into the new application folder ***src\META-INF\deployments\PageDefinition\BackgroundServiceExample***, replacing the Page definition created in the new Application by the Wizard. Similarly, as the Processes ***ExampleServiceFunction\_1.0***, ***UseService\_1.0*** and ***ListServiceResults\_1.0*** are not directly relevant to the Background Service Function these may also be copied from the supplied Example into ***src\META-INF\deployments\Process\BackgroundServiceExample***. Apply *Enactor>Register in Packages* to each.


## Adding the Background Service Process
The Background Service Process will be executed by the ServicesManager and execute in its own View, semi-independent of the main Swing Application. The Designer will first create the Application Process as described in Chapter 5, section ***Creating a New Application Process*** and design it as discussed following. To integrate the Background Service Process into the Application, edit the Java Class file: BackgroundServiceExample\src\com\enactor\sample\***BackgroundServiceExample.java*** and modify the ***runApp()*** method to add the highlighted lines as shown below:

``` java title= "BackgroundServiceExample.java"

protected void **runApp**() throws UIProcessException, ViewException {

**// Create a service view**

**try {**

**new BackgroundServiceView("ExampleService","BackgroundServiceExample/ExampleService",true);**

**} catch (ServiceException e) {**

**throw new UIProcessException(e, "Failed to create the BackgroundServiceView");**

**}**

// Create the main view

IPromptView mainView = (IPromptView) createView(MAIN\_VIEW\_ID);

**mainView.addViewListener(BackgroundServiceExample.this);**

addView(mainView, true);

// Run the main view

UIProcessContext.makeContext(mainView.getProcessRunner(), mainView

.getPrivilegeManager());

mainView.startProcess(START\_UP\_PROCESS\_ID);

}

```

![](./Images/Aspose.Words.7fea757c-113b-4cad-bfff-25432cc47c2f.012.png)

This will register the Process with the ***ServicesManager*** and create a View in which the ServicesManager will execute it when Started by the Service Manager Process (described next).


### **The Background Service Process Design**
Create an ***ExampleService*** Application Process as described in Chapter 5, section ***Creating a New Application Process***. This Process has three States, as illustrated below:

- An **Entry Point** State from which the StateEntered Event initialises the Service as Running.
- A **Looping State** as described in Chapter 6, ***Iteration in Application Processes*** and the example section ***Iteration Using a Looping State***, which drives the cycle of Service execution.
- An **End State** State, which provides a common point of convergence for the Looping State Completed Event, Stopping the service and handling Exceptions 

![Diagram Description automatically generated](./Images/Aspose.Words.7fea757c-113b-4cad-bfff-25432cc47c2f.013.png)

**Diagram: The ExampleService Application Process**

Add an Entry point State from the Tools Palette, which will automatically be set as First State, then the Looping and (End point) State State. Add *StateEntered* Events to the Entry point and End point States and create a Process Link from the *Completed* Event of the Looping State to the End point State.

Use the Resource Library to search and select the ***CheckControlServiceStatusAction***, which is shown in the Diagram with the Action ID of CheckServiceStatus, and create a Process Link to it from the *Execute* Event of the Looping State. The Outcomes of this Action define most of the Process Flows of the Looping State Execution Cycle. Create a Process Link from its *Stop* Outcome to the End point State.



Use the the Resource Library to search and select the following Service Control Actions and create Process Links to them from the specified *CheckControlServiceStatusAction* Outcomes:

- ***SetControlServiceAsRunningAction***.
  Action ID in the Diagram is *SetServiceAsRunning*.
  Map the Resume Outcome and the StateEntered Event of the Entry point State.
- ***SetControlServiceAsStoppedAction*** 
  Action ID in the Diagram is *SetServiceAsStopped*.
  Map the StateEntered Event of the End point State.
- ***SetControlServiceAsPausedAction*** 
  Action ID in the Diagram is *SetServiceAsPaused*.
  Map the Pause Outcome.

Similarly, use the the Resource Library to search and select the ***SetControlServiceCurrentActivityAction*** in three instances to provide the Actions shown in the diagram with Action IDs *ClearCurrentActivity*, *SetWorkingActivity* and *SetIdleActivity*. The *ClearCurrentActivity* Action specifies a Fixed value for the serviceMessage, which is specified as an Input Parameter for the **Message** Input Item. Put this Action on the Success Outcome of the SetServiceAsStopped Action and add a Process Flow from its Success Outcome to an End Process Action with a Success Outcome. The **Message** Input Item of the other instances require a Hard Mapping from the **serviceMessage** string State Data Item, which must be added to the LoopingState and is maintained using Assign Actions described following.

All these Actions use the **ControlService** Input Data Item, which is supplied a value by the ServicesManager when the service is started, as an Input Data to the Process. Create the Process Input Item by mouse-click and dragging it from one of the Action Inputs to the Process Inputs. The Process also requires an Integer **service.counter** variable for use in constructing the *serviceMessage*, as described following:

When the Service is Running, with each Execution Cycle of the Looping State the Run Event ois returned by *CheckControlServiceStatusAction*, in which context the Call Process Action runs the *ExampleServiceFunction* Process. The *SetControlServiceCurrentActivityAction* is used to update the Service Activity Message in the ControlService Object, which is used to provide User Information in the UI of the *ManageBackgroundService* Process. The *service.counter* variable is incremented before actioning each cycle and the message is updated to ‘*Working’* before and ‘*Idle’* after each execution:

- **Before**
  counter == null ? 0 : counter + 1 
  **Note** that the EL uses only the Simple Name of the *service.counter* variable.
  concat(concat("I am busy working (Counter ", counter), ")")
- **After**
  concat(concat("I am idle (Counter ", counter), ")")

Obtain the UIWaitActions for use in the Before and After phases and for the extended wait when the Service is Paused, from the Resource Library and specify the number of seconds to wait using Input parameters for the **WaitTimeSecs** Input Data Item.


### **The Service Manager Process Design**
Create the ***ManageBackgroundService*** Application Process as described in Chapter 5, section ***Creating a New Application Process***. This Process will be automatically registered in the Packages File but the Page Definitions and Processes copied into the workspace as described above may not. Manually register these by selecting them in the Package Explorer and using the Right-mouse Menu to select Enactor>Register in Packages. The *ManageBackgroundService* Process has four States, two of which are Message States used to report error conditions as illustrated below:

- An Entry Point **Start** State from which the StateEntered Event invokes the ***UIListServicesAction***  to discover the ServicesManager and list the Services registered with it (only one), then selects the zeroth element from the list in an Assign Action.
- A Prompt State, the **ManageServicePrompt**, which provides the UI to manage the Service in the ***BackgroundServiceExample/ManageBackgroundServicePrompt*** Page Definition.

![A picture containing text, indoor, screenshot Description automatically generated](./Images/Aspose.Words.7fea757c-113b-4cad-bfff-25432cc47c2f.014.png)

**Diagram: The ManageBackgroundService Application Process**

Add an Entry point State from the Tools Palette, which will automatically be set as First State, then add its *StateEntered* Event. Add the pair of Message States and modify their *State ID* and *Message Text* properties to identify their message function provide messages reflecting failures to Load and Control. Add a Prompt State and update its **URL** property using CTRL-SPACE to select the Page Definition ***ManageBackgroundServicePrompt*** that was copied into the Project then set its *State ID* property. Use the *Synchronise* Option of the Right Mouse Menu to *Synchronise with Prompt Variables* and *Synchronise Events with Prompt*. Also add the *WindowClosed* and *PromptTimeOut* events.



Use the the Resource Library to search and select the ***UIListServicesAction*** and add a Process Flow to it from the StateEntered Event of the Entry point State. This Action has outputs that identify the **ServicesManager** and a List of Services (one only) registered with it, which can be stored in the Process State Data; mouse-click and drag these Output Data Items to the State Data of the Process (***Note*** that the example has a **ServicesList** variable in the Process and uses a Hard Mapping to the Action). Create Process Flows from the *Fail* and *NoData* Outcomes of this Action to the FailedToList Message Prompt.

An Assign Action is used to extract the single **ServiceDescription** entry from this List. Obtain the Assign Action from the Tools Palette and mouseclick-and-drag the *ServicesList* variable from the Process to the Inputs area of the Action. Also add an Output *ServiceDescription* Data Item of type ***com.enactor.core.services.ServiceDescription*** to the Action and also mouseclick-and-drag the variable to the Process State Data. Configure a single Assignment in the Action; in the From Expression expand the servicesList underProperties and select the Asterisk then replace the question mark with a zero in the *servicesList[?]* expression. For the To expression select the *ServiceDescription* property.

A second Assign Action is used to extract properties from the **ServiceDescription** entry and store them in the Process State Data for use by other Actions. Drag the Action from the Tools Palette then mouseclick-and-drag the *ServiceDescription* variable from the Process to the Inputs area of the Action. Add the following three Output Data Items of type String and assign them values in the Action Assignments as described (Note that the ServiceDescription property expands to provide the **Id**, **status** and **currentActivity** elements):

- enactor.coreUI.**ServiceId**
  serviceDescription.id
- **serviceActivityMessage**
  toArray(values(serviceDescription.currentActivity))[0]
- **serviceStatus**
  enumName(serviceDescription.status)

Also, mouseclick-and-drag these three Output Data Items to the State Data of the Process

Again, use the the Resource Library to search and select the following Service Management Actions and create Process Links to them from the specified Prompt State Events:

- ***StartServiceAction***
  Create a Process Flow from the Start Event and map its Success Outcome to *ListServices*.
- ***StopServiceAction***
  Create a Process Flow from the Stop Event and map its Success Outcome to *ListServices*.
- ***PauseServiceAction***
  Create a Process Flow from the Pause Event and map its Success Outcome to *UpdateStatusAndMessage*.
- ***ResumeServiceAction***
  Create a Process Flow from the Resume Event and map its Success Outcome to *ListServices*.

For all these Actions create Process Flows from the *Fail* Outcome to the FailedToControl Message Prompt.

The example uses a Null Action as a common point of convergence of Process Flows before the End Process Action. Drag these Actions from the Tools Palette, add the *Success* Process Outcome and create a Process Flow from the Null Action Success Outcome to the End Process.

Create Process Flows from the *OKPressed* events of the *Message* Prompts and the *Return* and *WindowClosed* Events of the *ManageServicePrompt* to the Null Action.

