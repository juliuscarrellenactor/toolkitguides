# The Application Process
The newly-created Application Process consists of a blank Process Canvas containing only the Application Process itself, which is a context for application execution defining scope for variables and exception and event handling. The Process may receive **Inputs** and/or return **Outputs** and may store additional **State Data** elements for transfer between its internal State and Action elements.

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.6f0fa4ba-32ba-4528-acba-928d8bdbf218.001.png)

## The Process

As shown here, the Process displays the Process ID (a path relative to deployments/Process), its Inputs, Outputs and State Data Items. It also identifies the white Canvas background and the process elements represented in it. The Process may also identify Privileges, which are permission names defined by the developer and which must be possessed by the User as a prerequisite to access the function of the Process. Privileges are discussed separately later in this book. Note: Indicators may be present in the brown-coloured Process Header to represent aspects of the status of the Process design status, which are also discussed later in Part I.


As a Design Element the Application Process defines the ***Process Flow***, Execution ***States*** and ***Actions*** of a Process and the ***Data Items*** exchanged between them. These are its main elements, described following.

## **Process States**

The **States** of a Process also provide context for application execution defining scope for variables and for exception and event handling *within* the Process. Both States and Processes store State ***Data Items*** and may receive *Data Items* as Inputs and/or return them as Outputs. *States* are of different types underpinned by a **State Class** that defines their function, which in all cases, at the very least, is capable of intercepting and exposing **Events** to the Process.

![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.6f0fa4ba-32ba-4528-acba-928d8bdbf218.002.png)

The State Icon. As shown here, the State Icon displays the State Name, its Inputs, Outputs and State Data Items. The Icon may also display Events, which may be defined and named by the developer in a Page Definition used by a Prompt State or defined by the underlying Class of a State that generates an Event such as StateEntered. Indicators in the blue-coloured top segment of the Icon may be present to represent aspects of the status of the State; also discussed later. Note: Special attention is given to the rules surrounding Events intercepted and responded to by States in the section following.

### **State Data**

The simplest, nondescript **State** is referred to only as a State. In addition to this simple identifier of a defined Scope there are several existing, built-in States, each of which is associated with its own type of State Class. The Designer, in meeting exceptional requirements may have need to implement a bespoke State Class and if so, the class needs only to implement or extend the ***UIState*** Interface. The builtin States are described following:

### **Prompt States**

The Class within a **Prompt State** processes the ***Page Definition*** Design Element, as described in PART II of this book, *User Interfaces*. It renders and responds to a User Interface according to runtime context, returning ***Events*** arising from User Actions within the Interface and other sources and exposing them to the Process. The Prompt State is discussed in more detail in the Chapters of **PART II**.

### **Iterator and Looping States**

These States encapsulate iterative processing, either in the use of an Iterator derived of the processing of a List and used in the **Iterator State** or by managing a loop count variable in a **Looping State**. These states and their usage are described in separate Chapters of this part, **PART I** ,** *Application Processes*.

### **Error and Message States**

Both the **Error** **State** and **Message** **State** are essentially Prompt States These States encapsulate communication of specific ***Messages*** to the User in a User Interface, accept specific responses and return appropriate ***Events***; essentially a limited handling of the interaction with the User. Both are discussed in more detail in the Chapters of **PART II** in discussion of the ***Page Definition*** Design.


### **Process Actions**

The **Action** Element of a Process represents function in the Process Flow and encapsulates a Stateless Java Class (i.e. Stateless in that it may contain static final constants but contain no instance variables). These classes have an ***execute() method*** to which the Runtime Framework passes the ***Input*** Data Items specified in the *Action* and delivers data returned by the method to the ***Output*** Data Items specified in the Action. The execute() method may also generate an ***Outcome***, which is also returned to the *Action*.

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.6f0fa4ba-32ba-4528-acba-928d8bdbf218.003.png)

The Action Icon

The Action Icon displays the Action Name and its Inputs and Outputs. The Icon may also display Outcomes, which are names defined by the developer in the Class referenced by the Action. The Icon may also display Privileges, which serve the same function as those described for the Process. The discussion of Privileges in mandating Permissions later in this book also applies to Action Privileges. 

Note: Although Outcomes are developer defined, the use of recommended default values, which are offered in a dropdown list, is recommended in the interest of consistency and ease of maintenance.


### **Process Flow**

The **Process Flow** element is used to represented Process Flow in the Process Design Editor and is always a link between a pair of State and/or Action Elements.The begin-point of a Process Flow is always an explicit Event or Outcome and the endpoint is always another State or Action. Each ***Process Flow*** represents a distinct transfer of execution control, from a State to an Action, an Action to another Action or an Action back to the same or another State. In a final Process Design Definition all *States* and *Actions* are linked by a *Process Flow* to at least one other *State* or *Action*.

|![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.6f0fa4ba-32ba-4528-acba-928d8bdbf218.004.png)

### The Entry Point State

One and only One State in a Process must always be designated as the Entry Point, which represents the initial State of the Process and from which the Process Flow commences. As shown here, the Green Down-Arrow in this State Icon prominently identifies it as the Entry Point and Execution of the Process Flow by the Framework automatically begins at this State.

In the example shown the StateID is meaningfully set to indicate it as the starting point of the Process Flow. It also identifies a StateEntered Event, which typically, but not necessarily maps unconditionally to the first Action of the Process.|

The set of ***Process Flow*** elements within a Process fully define the overall course of processing through it from Start to End in all possible variants. ***Process Flow*** links initiate from an identified Event of a State or Outcome of an Action and always terminate at another State or Action. Branching can occur in Process Flow either within States or Actions, by the triggering of different Events or producing different Outcomes respectively, or by way of ***Conditional Process Flows*** emerging from these Events or Outcomes. Multiple *Process Flow* links may initiate from an Event or Outcome; one of the *Process Flow* links must always be Unconditional, all other *Process Flow* links must be conditional. The ***Condition*** of a conditional *Process Flow* link is a property of the Link and is defined in Expression Language as described later in this Chapter. Events, Outcomes and *Process Flow* links are used by the Runtime Framework to execute the Process.

