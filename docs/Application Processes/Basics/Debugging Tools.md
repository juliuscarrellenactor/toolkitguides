# Debugging Tools

Enactor Tools provides a facility to follow the execution of an application in the visual presentation of the Process Design Editor as the Runtime Framework executes selected Processes. The **Process Trace** is a helpful feature of Enactor Tools. One or more individual Processes of the Application can be opened in the Process Design Editor and flagged for tracing before executing the Application in Debug Mode.

To follow the execution of a Processes, open the Process in the Process Design Editor and use the ***Enactor Trace Process Icon*** in the Eclipse tool bar to enable and specify the progress rate of the Trace:

![](./Images/Aspose.Words.8b650b05-8853-468e-88b7-68df9d861e6d.001.png)

The toggle Icon enables/disables the trace and the slider determines the pace of execution (slower is further right).

![Graphical user interface, text, application, emailDescription automatically generated](./Images/Aspose.Words.8b650b05-8853-468e-88b7-68df9d861e6d.002.png)

When the application is executed in standard Java Debug mode using the debug Icon, as shown at left, the Process Elements being executed by the framework are highlighted as they execute. If multiple Processes are enabled, each Process is given focus in the Process Design Editor as it executes, allowing the Designer to monitor the path of Process Flow.

This feature is particularly useful if Processes are complex, since the Designer is able to observe that actual path taken in the context of a visual representation of the overall Process Flow.

The standard debugging elements of the Java development environment are also available, for example to create break-points in the code by double-mouse-click in the left vertical band of the Java edit window alongside the line of code at the point indicated by the blue circular break-point indicator as shown in the example below:

![Graphical user interface Description automatically generated with medium confidence](./Images/Aspose.Words.8b650b05-8853-468e-88b7-68df9d861e6d.003.png)

Having done so, and executing the process in debug mode as shown above, execution pauses at the breakpoint and prompts to open the standard Eclipse Debug Perspective:

![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.8b650b05-8853-468e-88b7-68df9d861e6d.004.png)

**Note** that the Process Design Editor also offers more advanced debugging facilities at process level such as breakpoints and stepping into and out of actions and processes. These are described in a later chapter.

## Enactor Provisions for Process-Level Debugging

In Chapter 1 the Enactor Process Level Trace facility was applied to examine how the Enactor Runtime Framework executes the Process Elements defined in an Application Process designed in the Process Design Editor, according to the specified Process Flow.

Before concluding our discussion of the Enactor Process Design Editor and Process Flow orientation of Application Design in Enactor we can briefly review the Enactor Tools enhancements to the debugging facilities provided by Eclipse and the JDE. These enhancements are of course, oriented to the Process Elements and Process Flow aspects of the Process Design Editor.

As we have already seen, for a single-process application, a Process-Level trace can be enabled, but it should also be noted that the trace is enabled/disabled explicitly at the process level. So in our further-developed swing application, which uses the Call Process Actions and the *Change Message* and *IteratorMessageChange* Called Processes the Process-Level trace may be selectively enabled for individual processes. The Process Design Editor Panel for the Process being traced is automatically and helpfully given focus when executing.

Just as breakpoints can be applied to Java classes at a code-line level, debugging enhancements of the Enactor ToolSet at the Process-Level provide for setting breakpoints on individual Process Elements. To set (or unset) a breakpoint on a Process Element, right-mouse-click on the element and select the ‘Toggle Breakpoint’ option from the menu:

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.8b650b05-8853-468e-88b7-68df9d861e6d.005.png)

The Process Level Breakpoint is indicated by the familiar blue button icon in the top right-hand corner of the Process Element Icon as shown left and set from the right-mouse menu as shown below:

![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.8b650b05-8853-468e-88b7-68df9d861e6d.006.png)

## Process Debugging Functions

Enhanced debugging facilities at process level are available that go beyond what is available in just standard Java debug mode.  Breakpoints can be set on entering states and actions and variables inspected on entry and exit. It is possible to single step through a process and to step into and step over actions and calls to sup processes.

## Creating a Process Debug Configuration

Process Level Breakpoints and Process level debugging is only in effect and available when the application is run in debug mode using a Process Level Debug Configuration.

![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.8b650b05-8853-468e-88b7-68df9d861e6d.007.png)|

To create a Process Level Debug Configuration use the Eclipse Debug drop-down menu option as shown at left and select the Debug Configurations… option to obtain the Debug configurations panel as shown below, in which the standard java Application level debug configuration for the HelloEnactor application is currently selected. Note the option in the left pane to define Process Debug elements.

![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.8b650b05-8853-468e-88b7-68df9d861e6d.008.png) 

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.8b650b05-8853-468e-88b7-68df9d861e6d.009.png)

The Create Debug Configuration Panel Double-mouse-click on the Process Debug Icon in the left pane to obtain the Process Debug creation panel and specify a name that will not conflict with the HelloEnactor already used for the standard debug configuration. However, specify the same launch (HelloEnactor) and check the Auto Launch Target VM CheckBox option as shown. Select Apply to create the configuration, which is now available to be used by selecting Debug.

![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.8b650b05-8853-468e-88b7-68df9d861e6d.010.png)

As indicated above, when the debug mode execution commences the Debug Perspective opens and the execution pauses at the first Process Level break-point. Process level Data Items are listed and their values:

![Table Description automatically generated with medium confidence](./Images/Aspose.Words.8b650b05-8853-468e-88b7-68df9d861e6d.011.png)

Process Level break-points are also listed and can be enabled/disabled during the execution:

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.8b650b05-8853-468e-88b7-68df9d861e6d.012.png)

The standard debugging facilities are available to step through the execution at code level.

### **Swing runtime Debug Window**

The platform also offers a runtime debugging window, which can be activated on the command line and executes with Enactor Java Swing applications. By adding ***–debug*** to the command line arguments in the Run Configuration a debugging window will appear showing running processes and allowing single stepping through the application. This feature does not require the tools context and is often a useful diagnostic tool in live environments.



