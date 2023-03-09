# Element Properties 

All of the Process Design Elements represented by Icons have Properties, the values of which define the specific instance of the element in the Design Definition. Some of these properties can be modified directly in the Icon itself or by using various tools and mouse-menu options of the Process Design Editor when the icon is currently selected. However, *all* of the properties of Design Elements are available for edit in the **Properties View**., as illustrated by example for a selected End Process below.

![](./Images/Aspose.Words.ee94340d-d645-42a2-967a-be0ffad16098.001.png)

The *Properties View* may be opened either by selecting the Eclipse **Window**>**Show View**>**Properties** option from the Eclipse Options Ribbon or by selecting the **Show Properties** option of the Right-mouse menu applied to the selected icon in the Process Design Canvas. 

The *Properties View* always reflects the currently selected element Icon in the canvas and presents a categorised list of the Properties of the selected Design Element. Properties are shown in the Left column and their current values (if any) are shown in the Right column, available for entry or modification.


## **Entering Values for Properties**

Depending on the Element Property various defaults, search options and edit supports are available in the value field according to the type of property. Mouse-click in the Value Field of a property selects the field and its existing value and enables the field for entry of a new value or modification of an existing value. For properties for which an existing set of predefined values is available a down-arrow icon in the right-hand side of the field indicates and may be used to access a dropdown list for selection. For other property types a specific data capture panel may be available, for which an elipsis icon in the right-hand side of the field serves as an indicator and may be used to access the panel, for example in the case of the Expression Builder. These indicators are illustrated below:

![](./Images/Aspose.Words.ee94340d-d645-42a2-967a-be0ffad16098.002.png)

The general properties of Design Elements are discussed in the next section.
## Properties of Process Design Elements

The values of properties of Process Design Elements provide much of the Process Design Specification. Some of the properties are specific to the particular variants of States and Actions and are discussed in the examples where they are applied in later Chapters. However, this section describes the general properties of the main Process Design Elements: Processes, States, Actions Process Flows.
### **Identification**

The values of the ***Type***, ***ID*** and either ***URL*** or ***ClassName*** (for a Prompt State or Action, respectively) are displayed in the Icons in the Visual Process Design Editor as an aid to identification of elements and their function during the Design process.
### **ID**

All Process Design Elements require unique identification. Processes, States and Actions all have a unique **ID**, which is exposed among the entries of the properties panel for Designer specification. When new elements are dragged to the Canvas or created by a design Wizard, they are automatically assigned a default value appropriate to the element type and incremented to be unique. While the ID is allocated a default value, best practice is that the Designer should provide an ID that clearly and concisely indicates the function of the element within the Process (or Process within an Addlication or System).
### **Type**

This property is displayed in the Icon Header and applies to elements that have variants (States and Actions). A default **Type** value also is assigned when the element is dragged from the Palette. In general, the Type need not be altered by the Designer.


### **ClassName or URL**

States and Actions have a **ClassName** property, which identifies the underlying Class of the State or Action that implements its function. The Prompt State also has a **URL** property, which identifies the Page Definition managed by the Prompt Class. For these element types, as appropriate, the URL or ClassName property is displayed in the element Icon Header. and also applies to elements that have variants (States and Actions). A default ClassName value also is assigned the element is dragged from the Palette. In general, the ClassName need not be altered by the Designer as they typically specify either a built-in Class of the platform that is always associated with the element Type, such as Assign (which implement a data assignment defined in Expression Language EL) and Null Actions, or a Class identified from the Resource Library (as discussed in Chapter 27). However, Actions and, although rarely, States also, may reference a Designer-defined Class.

**Note**: The interface provides convenient means to create new or find existing classes both builtin and developer-defined (by pressing CTRL-SPACE on the Class Name field on the property page).
### **Comment**

As is always good practice in Application Development, Comments provide opportunity for the Designer to communicate information of special interest about the element, or general information about the function of the element where it isn’t obvious.
### **Data**
Process Design Elements may store and exchange Data Elements with other elements of the design. These properties identify the Data Elements associated with the element and their relation to it.
#### **Inputs and Outputs**

States, Actions and Processes have Inputs and Outputs which as the names imply are the Data Elements either input to or output from the Process, State or Action. A list of zero or more **Inputs** or **Outputs** may be specified. These property values specify the Name and datatype of the respective properties.
##### Parameters

**Inputs** to States and Actions (not Processes) may be explicitly assigned a fixed value at the entry point of the State or Action (i.e. a specified constant passed into a State or Action). Parameters are specified by applying a value to an existing *Input*. First define the Input Data Element using double-mouse-click in the Inputs field in the Icon, then use SHIFT-double-mouse-click in the Inputs field to specify the Parameter value (dropdown lists ***Edit Parameters*** panel allow selection of the Input and its type). **Parameters** are identified in a distinct Property and may alternatively be specified in the Properties panel.

#### **State Data**

Processes and States can store and retain values for data elements for the duration of their existence. A list of zero or more **State Data** elements may be specified; their values specify the Name and datatype of the data elements. These values are available to be passed as Inputs to Actions or States or to receive values as the Outputs of Actions or States during execution of the Process Flow or returned as Outputs at the conclusion of the State or Process. As such, State Data elements *must* be defined for all Inputs and Outputs defined for the Process or State. This is attended to by the Tools when Inputs and Outputs for a Process or State are updated using its Icon in the Process. State Data Items exist and store values only for the life of the State or Process. Entries are added to the list whenever Inputs or Outputs are specified for the element or may be explicitly added to the list, as State Data elements may be created for use exclusively within the Process or State, neither received as input nor returned as output.
### **Events and Outcomes**

States expose **Events**; Actions return **Outcomes**. Outcomes are the return values of execute() method of the underlying Class of the Action. Events exposed by States derive from the underlying Class of the State or, in the case of Prompt States, they may also derive from the Page Definition specified in the URL property of the State (i.e. User actions such as Button-Presses). States have an **Events** property, which stores a list of the Events exposed by the State, Actions have an **Outcomes** property , which stores a list of the Outcomes returned by the Action. All Events or Outcomes that may be generated by a State or an Action, respectively must be exposed to the Process in the Design Element Icon. Until specified as the source of a Process Flow, Events and Outcomes are associated with an ***Unused*** checkbox, which may be checked by the Designer, suppressing the warning indicator in the Icon. However, if the Event or Outcome not used as a Process Flow, and the Event or Outcome is generated at runtime, an exception will result.



