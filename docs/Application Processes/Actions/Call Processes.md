## Call Processes

A **Call Process** Action is an Action that initiates execution of a specified ***Application Process***. Using the *Call Process* Action in a Process is analogous to using subroutines in code. In the Enactor Process Editor context, it serves to improve readability of the design and allows the called Application Process to be exposed, separately available for use by other Processes within an Application.

|![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.2d7b622f-75a8-45d8-9d45-735c1c60ea43.001.png)|

The Call Process Icon As shown here, the Call Process Action Icon decoration and header clearly indicate that it Calls a Process and displays the Action ID property in its title, which can be specified to meaningfully indicate the purpose of the action in the Process Flow. Below the title it displays the Process ID of the Process that it calls. Its Inputs, Outputs and Outcomes directly relate to those of the Called Process (i.e. its Inputs are relayed directly to the Called Process, it directly returns the Outputs retuned by the Called Process and it similarly returns the Outcome of the Called Process).

The underlying ***UICallProcessAction*** Class of the *Call Process* Action presents the specified Execute Process to the Runtime Framework, relaying *Process Flow* to its ***Entry Point*** State. ***Input*** Data Items of the Action provide values for those of the Application Process and ***Output*** Data Items of the Action receive values from its Outputs. The ***ProcessOutcome*** specified in the ***End Process*** of the Called Process when it terminates is returned as the ***Outcome*** of the Call Process Action.

Any Application Process identified in the Resource Library Index, which will include those created by the Designer, may be referenced in the **Execute Process ID** property of a Call Process. ***Note*** that workspace elements in other Eclipse Projects must be configured as dependencies. If the Application Process doesn’t already exist, it must be created by the Designer. There are therefore two aspects of using Call Processes: Identify an existing or create a new Application Process and add the Call Process Action to an Application Process that will reference it. Both ***Creating a New Application Process*** and ***Adding a Call Process*** are described in the following sections.


## Refactoring
The use of Application Processes and Call Process Actions provides the means to modularise complex applications, offering many advantages for maintenance, code reusability and, in the Enactor Tools environment, much better accessibility to understanding the functionality of applications for Developers, Designers and Business Analysts alike. Modularisation is ideally intrinsic to original design.

However, the need to modularise may become evident late in the development life cycle after an Application Processes has been enhanced to the point of being unmanageably complex. The process is referred to as ***Refactoring***; *Improving a computer program by reorganising its internal structure without altering its external behaviour* (See <https://en.wikipedia.org/wiki/Code_refactoring>). The Enactor ToolSet provides a helpful **Refactor** tool for use in this circumstance to modularise an Application Process based on a Call Process and the extraction of a suitable part of the functionality into a new Application Process. Refactoring using this tool is also described following in section ***Using the Refactor Tool***.
## Adding a Call Process
There are a variety of ways that a Call Process Action may be created in a Process, the most direct, but not always the most efficient being to drag the Call Process Action from the Tools Palette. Using the Resource Library often proves to be most convenient method, as described following.
### **Using the Tools Palette**
The **Call Process Action** Icon (![](./Images/Aspose.Words.2d7b622f-75a8-45d8-9d45-735c1c60ea43.002.png)) is available for selection in the Tools Palette as a specialised Action option to be dragged onto the Application Process Canvas. In the properties panel for the new Call Process, the **Action ID** property can be set to give the Action a meaningful value that reflects the function encapsulated by the Application Process it references. The **Execute Process ID** property is used to identify the Application Process that will be executed by the Action.
#### **Calling an Existing Process**
If the Application Process already exists and is available to the environment it will be listed in a newly indexed Resource Library and therefore can be selected by using CTRL-SPACE within the value field of the *Execute Process ID* property. Once the called process has been identified to the Call Process Action the Synchronise function of the Right-mouse menu can be used (select **Synchronise>With Called Process**) to set the *Inputs*, *Outputs* and *Outcomes* of the Call Process Action. These properties must correspond to those of the Application Process being called.
#### **Calling a New Process**
A Call Process Action can be added to a Process and manually configured independently of the Called Process, even before creating the Process. However, given the ease of creating the Call Process Action based on an existing Application Process, if a new Process is required, there is advantage in creating the Application Process first. The template Application Process can be created by the Application Process Wizard, as described above in section ***Creating a New Application Process***. To this end, it can be minimally developed as a stub, to only receive and return Data Items and Outcomes that are intended for the final design. The ***Synchronise>With Called Process*** option can then be used to create the Call Process Action and complete the Application Process Design later.


### **Using the Resource Library**
A more convenient alternative to synchronising a Call Process Action with an underlying Process is available in the Process Editor using the Resource Library. The Resource Library View can be opened using Eclipse Window>Show View>Other and in the Show View panel select ***Resource Library*** in the Enactor Tools Folder. Use the search facility to locate the required Application:

![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.2d7b622f-75a8-45d8-9d45-735c1c60ea43.003.png)

To include a Call Process Action that will call a selected Process mouse-click-and-hold the required entry to drag and drop it to the canvas. The Call Process Action will be created automatically with all required Inputs, Outputs and Outcomes appropriate to the Application Process (e.g. the **ModifyMessage\_1.0.xml** entry) as shown below:

![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.2d7b622f-75a8-45d8-9d45-735c1c60ea43.004.png)

### **Using a New Application Process**
The **Application Process** **Wizard** is available in the Enactor ToolSet to create new Application Processes. To create the new Application Process in the correct location within the Application deployments folder Right-mouse-click on the HelloEnactor folder under ***META-INF/deployments/Process/*** and select ***New>Other…*** expand the **Enactor Development** folder and select the **Application Process** wizard as shown here:

|![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.2d7b622f-75a8-45d8-9d45-735c1c60ea43.005.png)|![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.2d7b622f-75a8-45d8-9d45-735c1c60ea43.006.png)|

Selecting ***Next*** presents the **Process Settings** panel as shown below:

|![Graphical user interface, text, application, email

Description automatically generated](Aspose.Words.2d7b622f-75a8-45d8-9d45-735c1c60ea43.007.png)|<p>In the Process Settings panel specify a Name for the Process in the Process ID field. A new Application Process is then created in the Deployments/Process folder for the Application:</p><p>![Graphical user interface, text, application

Description automatically generated](./Images/Aspose.Words.2d7b622f-75a8-45d8-9d45-735c1c60ea43.008.png)</p>|

The new **Application Process** template is automatically registered in the Packages file by the Wizard:

```xml title="test xml"

<core:packageProcess>

`	`<core:processId>HelloEnactor/**ModifyMessage**</core:processId>

`	`<core:name>**Modify Message**</core:name>

`	`<core:version>1.0</core:version>

</core:packageProcess>

```

![](./Images/Aspose.Words.2d7b622f-75a8-45d8-9d45-735c1c60ea43.009.png) 

The Process is then available to the Designer to define according to requirement using the Process Design Editor as described in the previous Chapter. **Note**: ensuring that desisign of this Process is complete to the stage of exposing the correct Inputs, Outputs and Outcomes before adding the Call Process simplifies the task, as will become evident in the next section.


# Call Process Example

The starting point for this example is the downloadable ***InitialSwingApplication*** example, which represents the final status of the example described in Chapter 4, ***Using the Process Design Editor***. This will be refactored using a Call Process. The example exrcises both manual refactoring using basic facilities of the Process Design Editor and the automated **Refactor** Tool feature of the ToolSet, which have been described in the first part of this Chapter. This ***CallProcess*** and other examples are downloadable from the Enactor Website as described in About the Examples***.
## The Modified Example Process
The end result of the refactoring described in this example is illustrated below. The changes applied can be seen by comparison with the starting point as illustrated in the section ***Example – Using the Process Design Editor***. The Calling Process (main Application Process) is as shown below:

![](./Images/Aspose.Words.c166fb2e-4459-4943-9126-145af354bea1.001.png)

**Diagram: The Calling Process**

The Calling Process uses the ***CallModifyMessage*** Call Process Action to invoke the Called Process. The Called Process uses the *Modify Message* Action to add text to the message. Its *execute()* method simply appends to the Message. The ***Modify Message*** Process is as shown below:

![](./Images/Aspose.Words.c166fb2e-4459-4943-9126-145af354bea1.002.png)

**Diagram: The Called Process**
## Adding the Call Process Action

In the *HelloEnactorStartupProcess* add a new Call Process Action to the Canvas from the Tools Palette. Open the Properties Panel for the Call Process Action and set the ***Execute Process ID*** property; use CTRL-SPACE in the field to select the new ModifyMessage Process and press Return. The Call Process Action can now be updated using the ***Synchronise**>**With Called Process Option*** to set the Inputs, Outputs and Outcome properties.
### **Integrating the New Call Process Action**
The ***Process Flow*** must now be modified to connect up the Call Process action (see description in the section Re-Directing the Process Flow***). The Success Outcome of the Assign Action flows to the new Call Process Action and the Success Outcome of the new Call Process Action flows back to the *Main Prompt* State. The resulting flow is as shown below: The Success Outcome of the Create Message Action had formerly been a *Process Flow* linked to the State that was Cut from the Canvas in the operation described above. This can now be a *Process Flow* linked to the new Call Process. The Success Outcome of the new Call Process requires a new *Process Flow* linked to the Main Prompt State to complete the operation as shown below:

![](./Images/Aspose.Words.c166fb2e-4459-4943-9126-145af354bea1.003.png)

**Diagram: The Integrated Called Process**



