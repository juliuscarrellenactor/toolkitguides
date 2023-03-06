# The Process Design Editor

The Process Design Editor is a tool for the maintenance of Application Process Design Definitions. This Visual Editor provides a context in which the elements of the Process Design (***Process Flow***, ***States*** and ***Actions***) are represented by Icons that can be manipulated using the available Operations of the Editor. The remainder of this Chapter describes the Icons of the Process Design Editor and the Operations used to Edit the Process Design Definition. The following Chapter, ***Using the Process Design Editor*** describes an example in which many of these Operations are applied based on the Application Process created by the Swing Application Wizard, as described in the previous Chapter.

To edit the Application Process created by the Swing Application Wizard first locate and select it in the Project Explorer. To invoke the Process Design Editor, either double-mouse-click on the Process Icon in the Package Explorer or use the Right-mouse menu and select the options **Open With>Process Editor** as shown below:

<!-- ![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.00e483ed-30fe-4294-8193-0d848d6dd0d2.001.png) -->

The Visual Process Design Window opens to display the Application Process.


## The Process Design Editor Canvas
In the Visual Process Design Window of the Process Design Editor the basic elements of the Application Process are represented as Icons, including a Process Icon to represent the Application Process context.

![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.00e483ed-30fe-4294-8193-0d848d6dd0d2.002.png) 

**Diagram: The Visual Representation of HelloEnactorStartupProcess\_1.0.xml** 

The white background of the Process Design Window is the **Canvas** area within which are displayed all the elements of the Process Design. The *Process Design Canvas*, which is always displayed initially when the Editor opens, is one of two Tabs available in the window; the **Model Tab** and the **Source Tab**. The former is the Visual, more easily apprehended representation of the Process design but the raw XML version is also available for viewing and editing in the *Source Tab*. Edits in either are reflected in both.



The following details are represented in the *Process Design Canvas* of the diagram:

- The Process context itself is represented as a Named Icon:
  - The **Process** (Brown Icon) one only, represents the Process being edit
- The three basic element types are represented as Named Icons:
  - **Process Flow** arrows ![](./Images/Aspose.Words.00e483ed-30fe-4294-8193-0d848d6dd0d2.003.png), representing the Process Flow
    All State and Action icons are interconnected by lines of Process Flow.
    (Green from Actions, Black from States, Dotted if Conditional).
  - **States** (Blue Icons)
  - **Actions** (Green Icons)
- The green down-arrow ![](./Images/Aspose.Words.00e483ed-30fe-4294-8193-0d848d6dd0d2.004.png) indicates the **Entry Point**
- The red stop sign ![](./Images/Aspose.Words.00e483ed-30fe-4294-8193-0d848d6dd0d2.005.png) indicates a Process **Exit Point** (may be multiple)
- The Green Action Icons all contain **Outcomes** 
- The Blue State Icons all contain **Events**
- Both the Green Action and Blue State Icons optionally contain **Inputs** and **Outputs** 
- The Blue State Icons and the Brown Process Icon optionally contain **State Data**

## The Process Design Editor Palette
The Left-Arrow icon at the top-left corner of the *Canvas* can be used to expand the **Palette** as shown:

![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.00e483ed-30fe-4294-8193-0d848d6dd0d2.006.png)

**Diagram: The Visual Process Design Editor Palette** 

The Tools **Palette** includes the selection of available Process Design elements and their variants and other features from which elements may be selected for drag-and-drop into the Canvas. The range of ***Process Design Element*** types available for use in the Process Design are discussed following.


## The Process Design Elements
The principal elements of the Application Process are **Links**, **States** and **Actions**. Diverse types and variants of these elements are available for drag-and-drop into the Process Design from the ***States*** and ***Actions*** menus of the Tools Palette of the **Process Design Editor** as illustrated below:

|![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.00e483ed-30fe-4294-8193-0d848d6dd0d2.007.png)|![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.00e483ed-30fe-4294-8193-0d848d6dd0d2.008.png)|![Graphical user interface, text, application, chat or text message Description automatically generated](./Images/Aspose.Words.00e483ed-30fe-4294-8193-0d848d6dd0d2.009.png)|
| :- | :- | :- |
**Diagram: The Process Editor Tools Palette, States and Actions Menus**
### **Cursor Mode**
At the top of the Palette is a set of **Cursor Mode Control Tools**. 

|![](./Images/Aspose.Words.00e483ed-30fe-4294-8193-0d848d6dd0d2.010.png)|In the default Select Mode the Cursor and Mouse-click can be used to select individual Icons in the Canvas. Multiple Icons can be individually selected by holding the CTRL Key. Mouse-click-hold-and-drag can be used for selection of a cluster of Icons by holding the SHIFT Key.|
| :- | :- |
||In the Marquee Mode the Cursor and Mouse-click-hold-and-drag allows for simultaneous selection has three selectable variants as follows:|
|![](./Images/Aspose.Words.00e483ed-30fe-4294-8193-0d848d6dd0d2.011.png)|In this mode, all Icons that are fully within the Marquee, including Links, will be selected.|
|![](./Images/Aspose.Words.00e483ed-30fe-4294-8193-0d848d6dd0d2.012.png)|In this mode, all Icons that are fully within the Marquee, EXcluding Links, will be selected.|
|![](./Images/Aspose.Words.00e483ed-30fe-4294-8193-0d848d6dd0d2.013.png)|In this mode ONLY Links will be selected. This includes all Links that are even PARTLY within the Marquee.|
|![](./Images/Aspose.Words.00e483ed-30fe-4294-8193-0d848d6dd0d2.014.png)|The Link mode mandates that the next Cursor and Mouse-click must identify an Outcome or Event within an Icon and the subsequent Mouse-click will either complete a link, if within an Icon, or turn off this mode without creating a Link if not.|
|![](./Images/Aspose.Words.00e483ed-30fe-4294-8193-0d848d6dd0d2.015.png)|The Note Link variant of the Link mode behaves in similar fashion. However, it mandates only that the next Cursor and Mouse-click identifies an Icon but will only allow that the subsequent Mouse-click must complete a link to a Note or turn off this mode without creating a Link.|

