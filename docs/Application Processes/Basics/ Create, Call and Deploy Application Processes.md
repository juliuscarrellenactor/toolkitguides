# Create, Call and Deploy Application Processes
## **Introduction**
This document continues from “How to add Actions to Application Processes” and describes how to create new Application Processes and then how to call them and arrange for them to be deployed by the Enactor runtime.

## **Creating New Processes – Application Process Wizard**
You can create a new Application Process either by using *File-New-Other…* in Eclipse or by selecting an existing process that is similar and copying it. 

To create a new process in Package Explorer select the project and folder where you wish the new process to go:

![Description: Untitled](./Images/Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.008.png)

Then open up the Eclipse New file dialog and select *Enactor Development – Application Process* and press *Next*.

![Description: Untitled](./Images/Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.009.png)

On the next page is shown the first screen of the Application Process Wizard. Key in the identifier that you wish to use for the process and make sure that you have *Derive Filenames* clicked on. 

If you are adding a process to an existing application then all of the resources that that application uses is held in a *Packages* file. The new process can automatically be added to this file. Click *Register in Packages* and enter the pathname or browse to the packages file that is associated with the application you are extending.

![Description: Screen shot 2011-11-02 at 12](./Images/Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.010.png)

After pressing Finish you should see a blank process with just a process symbol on the top left:

![A screenshot of a social media post

Description automatically generated](Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.011.png)

All processes must have a first state. At Enactor we find it convenient if this is a type basic *State* which immediately moves onto the next stage by using a *StateEntered* event. This often allows easier reworking of mappings at a later stage of development of the process.

From the Palette drag on a *State* symbol, double click Events on the symbol and press the ‘+’ button to add an event and select *StateEntered* from the list. Press *OK* and you should end up with the following:

![A screenshot of a social media postDescription automatically generated](./Images/Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.012.png)


Now actions and other states can be dragged onto the diagram from the Palette or Resource Library or copied from existing diagrams.

### Copying a Process
To copy a process simply highlight the one you want to copy in Package Explorer and right-click *Copy*. Highlight the folder that you want to copy to and *right-click* paste. Enter a new filename for the process if prompted. 

Double click the new process to open it and check that the *Process Id* property of the new process is actually correctly set to the new name. If not then change it. If the process id does not match the filename then you will get a red error symbol showing against the process symbol on the top left of the screen.

# Deploying Processes at Runtime
Application Processes are physically represented as XML files and they are packaged into jar files along with the other software components such as Java class files, resource files and so on. Each jar file also contains a *Packages* file that identifies the Enactor components that are contained within the jar. These are things like the Application Process XML files, database entity definitions, server definitions and so on.

## **Packages File entry**
An entry in the application Packages file for the newly added process is required and is (under certain installation types) used by the runtime to deploy the process into its working 

folder. Here is a typical process entry in the file:

![A picture containing knife Description automatically generated](./Images/Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.013.png)

The working folder for processes to run from is a sub-folder called: *Data/{contextName}/Process* which is off of the *ApplicationHome* folder that is defined in the main enactor.xml configuration file. Context Name is generally the name of the application being run e.g. *Enactor Web Maintenance, Enactor Pos* etc…

## **Manual Deployment**
Sometimes it is desirable to leave the packages file entry until later. You then need to make sure that you deploy your process when you create it and when you make changes. This is done by using right-click *Enactor–Deploy to…* and selecting the context that you wish to deploy to. For example:

![A screenshot of a computer Description automatically generated](./Images/Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.014.png)

You can deploy new and changed application processes while testing. Provided that a process is not actually running inside the application when you deploy it will be reloaded when the cache inside the application times out. 

In “development mode” the Enactor runtime will load a new version of a process after an approximately 60 seconds delay (again provided it is not actually running). You just need to make sure that when running the application you leave the process being deployed so that it can be reloaded when you go back into it. To set development mode set the following inside the *enactor.xml* file:

`   	`**<core:**coreProperty** name**=**"Common.DevelopmentMode"** value**=**"true"**/>**

Note that the above will happen generally without rebooting the application as a whole. However if you have changed compiled resources, such as Java classes, then you probably will need to restart your application.

Setting up the deployment contexts is described in How to Run Processes from Eclipse. The basic approach is to set up an *Application Home* in *Eclipse-Preferences…Enactor Development…* together with a *Deployment Context*. A deployment context is where your processes will be run from in the file system:

![Description: Screen shot 2011-11-03 at 15](./Images/Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.015.png)

After this the appropriate Eclipse *Run Configuration* needs to be set up, depending on the project type you are working with. Here is an example of a run configuration for a Java Swing application that launches the process *HowTo/General/IteratorExample*:

![Description: Screen shot 2011-11-03 at 15](./Images/Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.016.png)

![Description: Screen shot 2011-11-03 at 15](./Images/Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.017.png)
## **Calling and executing Processes from another Processes**
In anything except the most trivial applications it is necessary to call Application Processes from each other. The system supports different ways of doing this for different purposes:

Call Process	This executes a sub-process with the defined inputs and returns when the sub-process completes or throws an exception. The outputs from the sub-process are placed in the call action’s outputs and the outcome from the sub-process is executed by the action. An exception is thrown if the called process cannot be found or is invalid.

Execute Process	This executes a process and does not return. Inputs declared are passed through to the executing process but there are no outputs or outcomes. An exception is thrown if the execute process cannot be found or is invalid.

Execute Background Process	This executes a process with one or more background threads. It returns straight away and will continue executing links in the main process and the new thread(s) will start executing the defined process id. If multiple threads are specified then each one gets its own instance of the process to execute in. This includes its own copy of process variables. However *View* level variables are shared between threads. An exception is thrown if the execute process cannot be found or is invalid.

Execute Process In Window	This is a special form of execute for use with UI applications. It runs the specified process using the main thread however it will continue execution of the calling thread once the sub-process has drawn its prompts. It is used to create processes that each look after their own UI windows or want to implement a pseudo background process in the main UI thread. After execution it will return with a success outcome and no outputs, unless the process cannot be found or is invalid, in which case an exception will be thrown. 

### Call Process
The easiest way to call another process is to drag the process that you want to call onto the diagram from the *Resource Library* pane. For example in the *Resource Library* select the search icon on the top right and then in the search box on the left key in the first few letters of the process that you want to call. Then drag the listed process onto the diagram. A *UICallProcessAction* will be created with the appropriate inputs, outputs and outcomes. For example:

![Description: Screen shot 2011-11-03 at 18](./Images/Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.018.png)

This can also be done by hand. From the alette drag a new *Call Process* action onto the diagram. Select the *Properties* pane and key in the full process id into *the Execute Process Id* field. You can bring up a search dialog if you select the blank id field and then press the ctrl-space keys together.

![A screenshot of a computer Description automatically generated](./Images/Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.019.png)

The process that is being called will generally expect some inputs and outputs and will return with one or more outcomes. These need to be reflected in the action that is calling the process. You can match these up by hand by editing the properties for the call action. However it is easier to select the Call process action and use right-click *Synchronise-With Called Process.* This will then set the action and process to matching declarations.

![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.020.png)

Using the other flavours of call and execute is done in exactly the same way. Some additional parameters are available on some of the variants and Execute. But otherwise usage is the same.
###
## **Setting up Process Resource Mappings**
If you find that double clicking on a process or performing some action on a process causes the following error dialog saying that it cannot find the process then you probably need to tell the designer how to locate the process you are using in the file system - this is done by setting up *Resource Mappings*:

![A screenshot of a social media post Description automatically generated](./Images/Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.021.png)

Press the *Configure Mapping* button, or go to the top menu bar and select *Eclipse-Preferences*  and then select *Processes* and press the *Add Mapping* button. The system identifies where resources are located by the first part of the identifier. In the example below we are telling the system that processes that have the first part of their ID as “HowTo” can be found in the project called “HowToGuides” and the folder where the processes are located is: *src/META\_INF/deployments/Process/How To*.

![A screenshot of a social media post Description automatically generated](./Images/Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.022.png)

You should end up with something like the following:

![Description: Macintosh HD:Users:mikecarrell:Desktop:Screen shot 2011-11-04 at 12.50.51.png](./Images/Aspose.Words.871f0dcd-9a6a-4e25-9d2f-8a9a2c3daccd.023.png)

### Where to find Examples
Call Process is widely used. In the POS project see the process *Pos/StartUp* and the action *LogStartUpSystemEvent*.

*Execute Process* is not widely used. However right at the end of *Pos/StartUp* again there is an example with the action called *WaightForSignOn*.

*Execute Process In Window* is used occasionally. Examples can be found in *Pos/StartUp*. For example see the action called *MonitorOperatorView.*

*Execute Background Process* is used occasionally. Examples can be found in *Pos/StartUp*. For example see the action called *StartDrawerLimitMonitor.*

