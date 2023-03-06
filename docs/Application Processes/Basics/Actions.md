---
sidebar_position: 2
---
# Actions
## **Introduction**
This document is a beginners’ introduction to Actions and Application Processes. In the Enactor system an action is a discrete function that does something. Actions are written in the Java programming language and are linked together into sequences which we call “Application Processes”. A design tool called the “Application Process Designer” is what is used to link actions and other types of design items together, such as screens, in order to create applications.

Essentially an action is a stateless micro-service that takes inputs and outputs and produces discrete value outcomes. They can also produce exceptions – which is what happens if something goes wrong inside of the code of an action. The code inside an action is always the same basic shape. Actions are implemented as Java classes and a single method called *execute(inputs, outputs)* of every action class is called by the Enactor runtime environment or by other Actions. 

Action classes are instantiated when needed and are passed their inputs by the runtime and return outputs and outcome values.

## **What is an Action?**
Below is an example of a very simple application process. It shows a single Action, the green symbol in the middle, which takes a single input, called *InputValue*, and produces two outcomes *Success* *and Fail*:


![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.03c78bb4-7519-43d5-8d6e-82e66b25a30f.008.png)


The brown symbol represents the process itself and shows *Inputs* and *Outputs* and also the *State Data* used inside of the process. Notice that this process has itself an input called *InputValue*.

The blue symbol is an application state with the name *Start*. States are described in more detail in other How To Guides. As far as actions are concerned they are executed in the context of a Process and a State. So the action *ValidateInput* above is being executed by the state called *Start* which is inside of a process called *ValidateInputExample*.

When the process above is run execution starts on the big green arrow pointing into the state called *Start* and immediately continues along the green arrow coming out of the *StateEntered* event. Basically in Application Processes the states respond to events such as user input and device and network events. *StateEntered* is a special event that is executed immediately. 

In the above diagram the *ValidateInput* action is executed straight away and the value of *InputValue* is passed in. The action executes and completes the process with either a *Fail* or a *Success*.

### Action Properties
Selecting an action with a single mouse click will show some information about it in the Eclipse Properties pane. If this is not displaying then on the main menu bar go to: *Window – Show View – Properties*. For example:

![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.03c78bb4-7519-43d5-8d6e-82e66b25a30f.009.png)

Looking at the properties of an action there are some key values that explain how the system operates:

The *ActionID* is then name originally given to the action when it was created by the developer. This is any name that is unique within the process. It is generally better to not have spaces in the id.

The *Class Name* is the name of the Java class that implements the function of this action. This is the full standard Java name. For example: *com.enactor.pos.actions.examples.ValidateInput.*

When creating new actions you type in the class name here that you want to use for the code. When wanting to associate an action with an existing Java class you can press ctrl and space on this property and get a search box displayed so that you can start typing into and the matching Java classes will be displayed.

*Inputs* and *Outputs* are properties that are defined as a list of variable names. The names are made up to suit the function being run but it is often useful to use standard names and also to qualify them with a namespace so that they don’t get confused with similar names made up by different people or organisations. BEWARE - THE NAMES ARE CASE SENSITIVE! An action my not use or require values in all the inputs that are specified.

*Outcomes* are values that can be returned by the action. In the example above there are two outcomes: Success and Fail. Like variable names it is useful if standard values are used. BEWARE - THE NAMES ARE CASE SENSITIVE! An action may not return all the values that are specified.

*Parameters* is a list of fixed values, numbers or strings, which are passed into the action via its inputs.

These are the key properties that are often used. The others are not generally used quite so much:

*Privileges* specifies a list of privilege names that a logged on user must have in order to run the action. If the user is not authorised then a *NotAuthorisedException* is raised by the system.

*Session Management Type* is used generally with databases and transactions and is described in other How To Guides.

*Type* is the type of action and is generally set when the action is dragged onto the process diagram from the *Toolbox*. The type determines what properties are associated with the action. The default type *Action* is the one that is used mostly for application code. The other types are generally used to implement process level operations such as executing other processes, looping, ending processes and so on.

*Default Next State ID* specifies what to do if an action returns an outcome that is not connected up or specified on the process diagram. It causes the runtime to transition to the specified state.

*Expected Execution Time* is an anticipated time that the designer expects the action to run in. If the action takes longer than this time then the runtime will log this as an incident. Note also that it is possible to record statistics on action execution time for diagnostics.

### Action Code
Double clicking the title bar of an action will take you to the source code if it is available. If only the java class is available then it will invoke the standard Eclipse class viewer:

![A screenshot of a social media post Description automatically generated](./Images/Aspose.Words.03c78bb4-7519-43d5-8d6e-82e66b25a30f.010.png)

The key parts of the code are as follows and they are the same for all actions:

The action class implements a standard interface called IUIAction. This has a single method called *execute()* which takes input data and output data and returns a single outcome value. The inputs and outputs are collections (maps actually) where the index to the value is the variable name. These are the same names as defined in the action symbol in the Application Process drawing.

Annotations at the top of the class, *@Inputs*, *@Outputs* and *@Outcomes* define what the action expects and returns. These are the details that are defined in the designer against the action symbol.

The action can throw *UIProcessException* and *ApplicationProcessException*.

You will notice that this action simply returns *Success* if the input value starts with the number 2. Otherwise it returns *Fail*. Rather than spell “Success” or “Fail” it uses a standard list of values in a class called *CoreUIOutcomes*. But any custom outcome value can be returned by creating an instance of the ApplicationProcessOutcome class.. For example by returning: *new ApplicationProcessOutcome(“MySpecialOutcome”);*

No matter how complex an application is all application level actions are exactly the same basic shape as the above. There is a special type of action called a “Built In Action” that is used to extend the functions that are part of the runtime environment. These are described in their own How To Guide. 

### Examples of parameter values
The following are some examples of parameter values that can be defined as inputs to actions (and states):

*true*					Boolean true

*false*					Boolean false

*Hello World !*				String

*123456*				Number

*Hello my name is {#{name}}*		String

#{null}					Object

*{name*} will be substituted by* with the value of a variable such as *enactor.address.Name.*

Note that some actions such as the *UILogMessageAction* take in a *LogMessage* string parameter which it will then substitute values into with a reduced format:

*Hello my name is {name}*


## **Creating New Actions**
Generally the best way to create new actions is to define the details within the Application Process Designer and then use the system to automatically create the code skeleton for you.

To create a new Application Process you can use a wizard that we provide that can be found in Eclipse under File – New – Other… and Enactor Development – Application Process in the selection box. Or alternatively copy an existing Application Process in Eclipse Package Explorer.

Start by dragging an action symbol from the *Tools* palette onto the Application Process drawing. 

![A picture containing screenshot Description automatically generated](./Images/Aspose.Words.03c78bb4-7519-43d5-8d6e-82e66b25a30f.011.png)

Then select the new action and edit the *Properties* pane, giving the action an *Action ID* and *Class Name*:

![A screenshot of a computer Description automatically generated](./Images/Aspose.Words.03c78bb4-7519-43d5-8d6e-82e66b25a30f.012.png)


### Defining Inputs and Outputs
Then add Inputs, Outputs and Outcomes by double clicking on the fields in the Properties pane or by clicking on the “**Outcomes**”, “**Inputs**” or “**Outputs**” labels directly on the symbol.

On the *Inputs* definition panel click the first empty Name field and key in the name of the variable. In the example below we are using the name “InputValue” but qualified with a namespace of “enactor.mfc” which is one of the namespaces that we use at Enactor. Next to the value on the *Type* column click the field and select *java.lang.String*. This is the type of the variable that we are adding. 

You should see something like the following:

![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.03c78bb4-7519-43d5-8d6e-82e66b25a30f.013.png)

Notice that for ease of reading when you save the inputs the symbol only displays the main part of the name. REMEMBER THAT IT IS ALWAYS THE FULL NAME WITH THE NAMESPACE THAT IS USED INTERNAALY WHEN RUNNING THE PROCESS. 

If the designer detects that variables have been declared that have the same main part but different namespaces then it will display the full names highlighting that they are in effect different variables.

When entering the name of an input or output it is possible to press ctrl and space in order to bring up a search box. Enactor has defined a large number of common names and this enables you to pick one out. The list is displayed as you start typing, showing names that match.

Outputs are added in exactly the same way as described above for *inputs*. 

### Defining Outcomes
Outcomes are similar to the above. You can type in any value or select a standard value from a drop down list:

![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.03c78bb4-7519-43d5-8d6e-82e66b25a30f.014.png)

Notice that warnings or errors are highlighted on the action symbol. For example having defined some outcomes the designer tells us that they are not connected by displaying a yellow warning symbol on the top right hand corner. Hovering over the symbol with the mouse will display details about the errors. 

In the example below there is an additional error highlighting that the input variable cannot be sourced from the process – there is actually a typing error. The input variable has been typed as: “*com.mfc.InputValue*” but it should have been “*enactor.mfc.InputValue*”.

![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.03c78bb4-7519-43d5-8d6e-82e66b25a30f.015.png)

The error and warning symbols are very helpful when designing and modifying processes.

### Creating Action code
Once Inputs, Outputs and Outcomes have been defined (there may be no inputs and/or no outputs but there must be at least one outcome) then you can use the designer to generate a code skeleton for the action that can be filled in. Double click the action and click *Yes* when prompted to create:

![A screenshot of a cell phone

Description automatically generated](Aspose.Words.03c78bb4-7519-43d5-8d6e-82e66b25a30f.016.png)

Choose the folder where the source code for the action is going to go. This will be one of your existing Eclipse projects and folders within a project.

![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.03c78bb4-7519-43d5-8d6e-82e66b25a30f.017.png)

Check that the class name entered in the properties pane is correct or enter it now if it was left blank before. In the example below the class name is going to be: *com.enactor.pos.actions.examples.ValidateInput*.

![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.03c78bb4-7519-43d5-8d6e-82e66b25a30f.018.png)

Press Finish and the system will make skeleton action for you that will look very similar to the code example given earlier.

## **Connecting up Actions**
Once actions have been defined they are connected up by using the *Link* tool and dragging the cursor from the action outcome that you want to connect to the next action or state.

Notice that there are a number of sections with actions and other types. If you are following the example given earlier then to connect up the action we have created and complete the process select the *Actions* pane in the Palette and an drag two *End Process* actions onto the drawing and then connect up the *Start* state by selecting the Link tool and dragging the cursor from *StateEntered* on the *Start* state to anywhere on *ValidateInput* and from the *ValidateInput* outcomes to the End Process symbols.

![A screenshot of a map Description automatically generated](./Images/Aspose.Words.03c78bb4-7519-43d5-8d6e-82e66b25a30f.019.png)

You can move the symbols around to tidy up the drawing and also tidy things up a bit by removing unused properties on symbols. To do this select a symbol with the mouse and then right click and select *Style* and select what you want to show or hide:

Set the Process Outcome on each End Process symbol by selecting the symbol and clicking the *Process Outcome* field in the Eclipse Properties pane. You can select *Success* and *Fail* from the list of predefined outcomes or key in any value of your own.

![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.03c78bb4-7519-43d5-8d6e-82e66b25a30f.020.png)


## **Changing Inputs, Outcomes or Outputs of Actions**
If you want to change the definition of inputs, outputs or outcomes of actions you can do this either using the design tool as described above or by editing the annotations inside the action’s code.

You can the update one or the other by selecting the action’s symbol and then using right-click *Synchronise – With Class Annotations* or *Synchronise – Update Class Annotations*. 

*Synchronise – With Class Annotations* updates the symbol with the values defined in the Java code of the action.

*Synchronise – Update Class Annotations* updates the class annotations with the latest values in the symbol.

## **Using Actions from the Resource Library**
Any project defined in Eclipse and any jars included in the classpath of projects contribute reusable components that are indexed and accessed through the Resource Library pane in Eclipse. If this is not displaying then from the Eclipse menu bar select Window – Show View –  Other… and then Enactor Tools – Resource Library.

In the Resource Library *Search* box key you can key the name of a component and the list will show the results. The Resource Library indexes and displays different types of re-usable components including actions. In the example below a search on “http” shows an *HTTPDownloadFileAction*. 

Clicking the action shows the annotations in the righthand box and also any documentation that is defined in the action class file:


![A screenshot of a cell phone Description automatically generated](./Images/Aspose.Words.03c78bb4-7519-43d5-8d6e-82e66b25a30f.021.png)


![A screenshot of a social media post Description automatically generated](./Images/Aspose.Words.03c78bb4-7519-43d5-8d6e-82e66b25a30f.022.png)

