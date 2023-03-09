# Application Hooks

Enactor Tools strongly supports sharing of code elements. Where Applications share functionality, or variants of an Application are required, whilst maintaining a common Code Base, the need sometimes arises to provide means for changing or enhancing application functionality to developers who have no access to the primary code base. Enactor Tools accommodates this requirement at the **Process** level. Two methods are available: **Process Sets** and **Extension Points**.

***Process Sets*** offer the simpler implementation but require override of the Process with a different version. ***Extension Points*** however, provide for explicitly defined points in a Process Flow at which, after the *Extension Point* is added, designers may add processing before or after the existing function at the Extension Point or replace the existing function altogether. 

While the developer applying *Process Sets* requires no preconditions or access to the original code base, the use of an *Extension Point* requires that it has been provided for in the original code base.

## Accessing Processes

Whether using Process Sets or Extension Points, Developers will require Read Access to Process of the original code base in order to create their own variants of them or to identify and obtain information about existing Extension Points within them. They may also use them to add the Extension Points they wish to have added to the original code base. Developers have read access to all Process of the Enactor Tools Plugin and Platform.

Developers may obtain copies for all Process dependencies of their project into the Runtime Execution Environment by setting an execution flag in the Run Configuration. If the **-deploymentMode=LEGACY** argument is specified in the Eclipse Run Configuration, all of the Application Design Definitions and Resources of all of the Application Dependencies will be copied to folders under the **Data** folder. 

When implementing ***Process Sets*** the Designer can access the Process(es) they wish to override, the *deployments* folder structure in which to deploy their changes and the *enactor.xml* file in which the Process Set must be configured.

When implementing ***Extension Point*** changes the Designer can access the Process(es) in which to identify the existing Extension Points they wish to use or implement the Extension Points they would like to have added to the original code base.

This Chapter describes how to apply each of these strategies and includes description of an example available for download from the website.


## Using Process Sets

The use of Process Sets to override existing Processes of an Application requires three operations:

- Add a Common.ProcessSet configuration variable to *enactor.xml*.
- Add a ProcessSet folder structure under deployments/process in META-INF.
- Create and Register a modified copy of the Process(es) in the added folder
  (Enhance the ProcessSet Folder Structure to reflect the relative URL of each ProcessID).

### Creating a Process Set

The Designer invents a name for the Process Set (e.g. MyOVERRIDES) and uses it wherever the reference <*ProcessSetName*> is used in the following description. 

1. Edit the *enactor.xml* file in EnactorHome/config.
   Add the following coreProperty  to the coreProperties group element:

   ```xml title="Packages.xml"

   `   `  <coreProperty name="**Common.ProcessSet**" value="***YourProcessSetName***" />

   ```
2. A new deployments folder is required:
   META-INF/deployments/Process/***YourProcessSetName***

### Overriding Processes

Override processes that will be modified must be copied to this new deployments folder. However, a full path must be created to reflect the Relative URL of the Process in its Application Reference. To obtain this full path open the process in the Process Design Editor, make the brown Process Icon the current selected element and open the Properties Panel. The Process ID property will contain the relative URL of the Process as it is referred to in the Application. The path normally reflects the Application name, for example your-application-name/process-name, in which case the Process file would be copied to:

META-INF/deployments/Process/***YourProcessSetName***/your-application-name/your-process-name.

***Note***: The path under /***YourProcessSetName***/ *must* correspond to the relative URL specified in the Process ID of the Process to be copied.

The Process file can now be copied to the deployments Overrides folder, registered and modified to requirements as follows:

Locate the Process of interest under the enactorHome.Data folder structure of the runtime execution environment in the Eclipse Project Explorer. Right-mouse-click on the Process element and select **Copy** from the right-mouse Menu. Select the Path folder that has been created for the Process under the ***YouProcessSetName*** folder and select **Paste** from the right-mouse Menu.

**Note**: After performing this Process Copy, check the Process ID in the new copy in ***YourProcessSetName*** folder because Eclipse sometimes incorrectly modifies it; the new Process ID should include its location in the ***YourProcessSetName*** folder.

The process must then be Registered in the Application Packages File. To do this Right-mouse-click on the Process element and select the **Enactor** Submenu from the right-mouse Menu. Then select ***Register in Packages***.


### Parent and Child Process Sets

Only ONE ***YourProcessSetName*** may be used in an application.

(i.e. Only ONE 

```xml title="Packages.xml"

` <coreProperty name="**Common.ProcessSet**" value="***<ProcessSetName>***" /> 

```

entry will be observed in the *enactor.xml*).

Providing for the possible requirement that a group of Application Variants may share a set of Processes divergent from the original Code Base, yet each require their own individual Process modifications, Enactor Tools provides the Parent Process Set, which applies the same constructs in the same way, as follows: 

In the *enactor.xml* file the following coreProperty is used in the coreProperties group element:

```xml title="Packages.xml"

` <coreProperty name="**Common.ParentProcessSet**" value="***<ParentProcessSetName>***" />

```

A deployments folder structure also provides for Parent and Child Processes:

- META-INF/deployments/Process/***YourParentProcessSetName***
- META-INF/deployments/Process/***ProcessSetName***

## Process Sets and the Runtime Framework

At Runtime, the Runtime Framework will search for a Process based on its **Process ID** under the designated **Process** deployments location. However, if a **Common.ProcessSet** configuration parameter is defined the *Process ID* will be sought in the ***YourProcessSetName*** folder under the designated **Process** deployments location. If the *Process ID* is not present in the ***YouProcessSetName*** folder, then if a **Common.ParentProcessSet** configuration parameter is defined the *Process ID* will be sought in the ***ParentProcessSetName*** folder under the designated **Process** deployments location.

Thus, a Child Process Set element overrides a Parent Process Set element, which in turn may override the Process element of the Original Application Code Base.

**Note** in particular that all of these alterations and overrides may be applied and implemented without the need of Write Access to or special provision in the Original Application Code Base.


## Using Extension Points

The use of Extension Points in an Application requires two phases of Design implementation; one in the Original Code Base, to create the Extension Point as described in section ***Creating an Extension Point*** below and one in any (or each) variant context that will use it to enhance or override existing Processes of the Application, as described in the following section ***Using an Existing Extension Point***.

### Creating an Extension Point

Extension Points must be added on request into the Original Code Base by the responsible Designer.

**Note**: As an interim measure the Designer of the variant may use a ***Process Set*** to override the Process that will contain the Extension point and include the required Extension Point in the Override version. This version of the Process will also serve as a requirement specification for the Original Code Base.

To begin, the Designer invents a name for the Extension Point (e.g. MyExtensionPoint), which will be specified as the **ExtensionPointId** Input Data Item for the ***Call Extension Point*** Action described following and applied wherever the reference <*ExtensionPointId*> is used in the following description.

#### **The Call Extension Point Action**

A **Call Extension Point** Action initiates optional execution of one or more specified *Application Process*, which are configurable as Extensions in a Packages File available to the Application. Using the *Call Extension Point* Action in a Process is similar to using a Call Process Action but is much richer, since multiple Application Processes may be configured as Extensions associated with the ***ExtensionPointId*** and optionally to execute in a specific order. Extension Points are also much more flexible, as will be appreciated from the following section describing their usage in ***Using an Existing Extension Point***.The **Call Extension Point Action** Icon (![](./Images/Aspose.Words.99359b41-60f2-4f41-88b4-8c097138750b.001.png)) is available for selection in the Tools Palette as a specialised Action option to be dragged onto the Application Process Canvas.

|![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.99359b41-60f2-4f41-88b4-8c097138750b.002.png) The Call Extension Point Icon 

As shown here, the Call Extension Point Action Icon decoration and header clearly indicate that it provides an Extensibility function and displays the Action ID property in its title, which can be specified to meaningfully indicate the functionality encapsulated in the action at this point in the Process Flow. Three predefined Outcomes of the action are described below. The enactor.coreUI.ExtensionPointId Input String parameter is Designer defined when adding the Action and allows for the Extension Point to be uniquely identified when creating Extensions based on it in a Packages File of the Application as described following. All and Only Inputs and Outputs of the Extension Point Action may be received as Inputs or returned as Outputs, respectively by any of the Extensions and passed between consecutive Extensions.


The underlying Action Class of the ***Call Extension Point*** Action identifies the Application Processes for execution based on Extensions declared in Packages available to the Application and manages the transfer of Inputs and Outputs between them and of the Outcomes returned to the Calling Process.


#### **Extension Point Design and Inclusion**

There are three general approaches to adding an Extension Point, which can be used used according to circumstance:

1. Insert an **empty** Extension Point.
   In this case a Call Extension Point Action is simply inserted into a single Process Flow
   (AàB becomes AàExtensionPointàB). No pre-defined Extension is included.
1. Replace an existing *Call Process* Action with a *Call Extension Point* Action and registering an Extension specifying the Execute Process ID of the Call Process as the Extension URL.
1. Refactor a segment of the Process as a Called Process then proceed as in 2. Above.

**Note**: An Empty Extension Point, as in case 1. Above, serves merely as a placeholder and reference point at which a designer may Register Extensions in another Package.

#### **Registering Predefined Extensions**

An Extension Point may be required only to provide an entry point at which designers may insert new Processes at a specific point in an existing Process of the Original Code Base. However, an Extension Point may be also be used to allow designers to supplement or override an existing Process. If this is the case, the existing Process executed at the new Extension Point **must** be registered as an ***extension*** in the Packages file of the Application. For example, in cases 2. and 3. Above, the Extension Point represents existing functionality, which has been encapsulated in an Application Process. Its Process ID must be registered as an ***extension*** in the Packages file of the Application. Extensions are registered in the Original Base Code in the same way as they are defined for Application Variants, as described following in section ***Using an Existing Extension Point***. However, Application Variants will use their own, separate Packages File.

### Using an Existing Extension Point

A Variant application that will Extend or Override functionality based on an existing ***Extension Point*** in the Original Base Code will use a separate Eclipse Project in which to create all of the Design Elements associated with these extensions and a Packages.xml File in which to configure the Extensions. Package Extensions must be registered in the Packages.xml File. This Project will include, as a minimum, a *deployments/Process/Extensions* folder and a *Packages.xml* file under the META-INF folder. A convenient way to do this, after creating the new Eclipse Java Project, is to first select the Project in the Package Explored perspevctive and use the Right-mouse Menu to select ***Enactor>Add Deployment Folders***. In the *Add Deployment Folders* Panel use the *Select/Deselect All* options and Checkboxes to specify requirements according to the Enactor Tools Design Elements that will be required.

After creating the required Processes and related Classes and other resources to be applied to the *Extension Point* the Designer can register the required Extension(s). In most cases only a single Process addition or Override is required, and execution order may not be important. However, if multiple Process Extensions are involved, or if there are other Projects using the same Extension Point the Designer may wish to influence the order of execution relative to other Extensions, which is controlled by reference to the Packages that contain them. The Designer therefore may need some insight to the relationshipa of Packages, Processes and Extensions.


#### **Packages, Processes and Extensions**

In all of the Application Design activities discussed so far, the existence and involvement of the Packages File has been transparent because this is largely managed by the Design Tools. A Packages file containing a single Package entry is created by the Swing Application Wizard and new Design Elements such as Processes are automatically registered in it. If the Designer’s Extensions Project involves only a single extension, or multiple extensions that require no particular execution order these automatic registrations will suffice. Also, if there are other Extensions Projects using the same Extension Point, these projects will each have their own Packages File, which can be referenced to define any execution order requirements.

However, if the Designer’s Extensions Project involves multiple extensions that require a particular execution order, the Designer may need to register Extension Processes in separate Packages (created within the Packages File of the Project) by which to specify that order.

##### **Creating Additional Packages**

Packages can be created using the ***Packages Design Editor***, which can be accessed either by double-mouse-click on the Packages.xml file inderMeta-INF in the Packages Explorer or by selecting it and using the Right-Mouse Menu to Open With>Packages Editor as shown below:

![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.99359b41-60f2-4f41-88b4-8c097138750b.003.png)

In the Description Tab of the *Packages Design Editor* use the Add Option to create a new Package, which can be given a Designer-specified **Package *ID*** and **Name** in the ***Add Package to Packages*** Panel.

![Graphical user interface, text, application, email

Description automatically generated](./Images/Aspose.Words.99359b41-60f2-4f41-88b4-8c097138750b.004.png)

With multiple Packages in the Packages File the automatic registration that occurs when Processes are created prompts to select a package from a dropdown list of those that have been created.


#### **Registering Extensions**

Processes that supplement or override existing functionality of the Application at an Extension Point must be registered as **Extensions** in the Packages File. *Extensions* identify the Process, specify if the Process overrides existing Extensions and if necessary, control the order in which the new and existing Process Extensions execute. This section describes how the Designer can edit the *Packages.xml* File in order to register Extensions. The Designer needs to know the name of the ***Extension Point*** and the Packages File in which it occurs. If process order relative to other Extensions Packages is important then the Designer needs also to know the names of the other, relevant Packages Files. The Packages.xml File can be accessed for edit in the Packages Design Editor as described above in the section ***Creating Additional Packages***. Extensions are registered using the **Extensions Tab**.

#### **Extension Packages**

The left-hand panel of this Tab lists the Packages containing Processes that will be registered as Extensions. In most situations this will be the main (and only) Package of the Project, which is automatically present. However, if Processes have been registered in separate Packages in the same Packages.xml for the Extensions Project, for the purpose of execution order control as described above, the Designer will need to use the **Add** Option to specify each Package ID and name for this list.

#### **Package Extensions**

Extensions defined for a Package, which are listed in the centre panel of the Tab, pertain to the Package currently selected in the left-hand Packages panel. Extensions must be registered in the same Package that contains the Extension Process that to be registered.

#### **New Extensions**

To create an Extension, select the Package in the left panel and then select the **Add** Option in the Centre panel (Package Extensions). A placeholder ***extensionPointId*** will be added to the Package Extensions list and entered into the **Extension Point** field in the right-hand, Description panel of the Tab. The placeholder in this field must be replaced with the actual ExtensionPointId being used and a meaningful, Designer-defined **Name** specified.

In the **Extension URL** field use the *Browse* Option to search for the Extension Process. This is a filtered search. When a filter value is entered to the ***Select*** field, the ***Matching resources*** panel will be populated. When a Process ID is selected in this panel, if there are multiple instances of the same name in the workspace, the list in the ***In Folders*** panel can be used to differentiate and select the correct Process. Use the dropdown list in the **Type** field to select the Process value entry. Currently only Process and JSP are supported and only Process is applicable to this Chapter.
#### **ExtensionConfiguration**

The two Lower Panels, **Extension Overrides** and **Apply Before Packages**, allow for configuration of the Extension as an *Override* of another Extension and to assert Execution Order, respectively. Both can be specified, and the specification applies to the Extension Point entry currently selected in the *Package Extensions* panel. If a Package is specified in the *Extension Overrides* panel the Process referenced by an Extension of the same ExtensionPointId in that Package will not be executed but replaced by the current Extension. If a Package is specified in the *Apply Before Packages* panel the Extension Process will execute before all Extensions of the same ExtensionPointId in that Package.


### Extension Points and the Runtime Framework

At Runtime, when the Extension Point Action executes, the Runtime Framework will identify all Extensions in all available Packages that reference the specified *ExtensionPointId*, exclude any Extensions that are Overridden and execute those remaining for each Package, applying any Execution Order specified by the Apply Before Packages criterion until either one of the Processes sets the **StopExtensionLinking** Flag or one of the Process Executions Fails or all of the Extensions have been Successfully executed. If no Execution Order is specified, the extensions are executed by Package according to the order of Package Registrations.

#### **Extension Point Inputs and Outputs**

During this execution sequence, all Processes have access to all of the Inputs specified for the Extension Point, if they also specify them as Inputs. Each Extension Process will also have access to any Outputs of any Process executed prior to it in the execution sequence, if they specify them as Inputs. All Outputs of the Extension Point Action will take the value of the last executed Process that Outputs the data Item or will be undefined if there is none. These Inputs and Outputs relations are illustrated and annotated below:

![A screenshot of a social media post Description automatically generated](./Images/Aspose.Words.99359b41-60f2-4f41-88b4-8c097138750b.005.png)

**Diagram: Extension Point Inputs and Outputs**

In the above diagram, note that Extension Point Inputs A, B and C are only accessible to Processes that also declare them as Inputs. Processes 2 and 3 are also able to declare and use P and Q as Inputs, which are not Inputs to the Extension Point but are Outputs of Process 1. The Extension Point Output Q has the value as Output by Process 2, not as Output by Process 1. The Extension Point Input C is also an Output but is returned with the value Output by Process C.


# Example – Providing Application Hooks

The ***ApplicationHooks*** example serves to illustrate the use of both Process Overrides and Extension Points and includes Four Eclipse Projects. Two of these projects, the *ApplicationHooksBase* and *ApplicationHooksCommonData* can be imported to Eclips and executed to demonstrate the Application behaviour independent of the *ApplicationHooksProcessSets* and *ApplicationHooksUseExtensionPoint* projects.

### The ApplicationHooksBase Application

Development of the *ApplicationHooksBase* Application begins with the use of the Swing Application Wizard as described in Chapter 2, Using Enactor Tools. Two Action Classes, *ModifyMessageA* and *ModifyMessageB* are introduced to append text fragments to the ‘Hello World’ Message as described in Chapter 4, Using the Process Design Editor and in both cases the Action is encapsulated in a Called Process as described in Chapter 5, Using Called Processes. A **Call** **Extension Point** Action is introduced between these two Call Processes as illustrated below and described following:

![Diagram

Description automatically generated](Aspose.Words.99359b41-60f2-4f41-88b4-8c097138750b.006.png)

**Diagram: Application Example Additions to the Template Swing Application**

**Note**: A *Create Object* Action is also introduced to the Application, which encapsulates the String Message of the standard Template Swing Application as a Text property of a Message Object. The Message wrapper Class is provided in the ApplicationHooksCommonData Project shared throughout the example. The use of a wrapper class will not be required in the next Tools Version to be released with Enactor V2.7.


#### **Adding the Extension Point**

The Call Extension Point Action is dragged into the Process Design Editor Canvas from the Actions folder of the Tools Palette and by SHIFT-double-mouse-click on the ***ExtensionPointId*** Input Item the name MyExtenstionPoint is introduced as an Input Parameter. The ***Message*** Data Item was also added as an Input and Output. In this example, the ***StopExtensionLinking*** and ***Success*** Outcomes are treated as equivalent and mapped to the *CallModifyMessageB* Action. The Success Outcome of the *CallModifyMessageA* Action is redirected to the CallExtensionPoint Action to include it in the Process Flow.

##### **Adding the Extension**

The Extension Point, created as described above, could be used as-is, without contributing any Processing in the Base Application. However, this example includes a Base Application Process. The ExtensionPointProcess is essentially the same as those described above, which execute the *ModifyMessageA* and *ModifyMessageB* Class methods; its action executes the *ModifyMessageC* Class method. Absent the need for an Extension Point it could have been included in a Call Process Action in the same way. Before adding the Extension, the Application will execute and return a response as: 
Hello xxx [ModifyMessageA][ModifyMessageB]

Create the *ExtensionPointProcess* and *ModifyMessageC* Class or copy them from the example project. Note that *ExtensionPointProcess* is created under an **Extensions** Folder under deployments/Process.

**To add the Extension**, select the Packages.xml in the Projects Explorer and double-mouse-click to open the Packages Design Editor and select the Extensions Tab. The main Application Package will already be listed as the only Package. In the central Package Extensions Panel use the ***Add*** Option to create a new Extension. In the right-hand Description Panel specify the value given to the *ExtensionPointId* Input Item of the Extension Point Action (“MyExtenstionPoint”) as the value of the **Extension Point** Property and give the Extension Point a **Name**. Use the Browse Option to locate the *ExtensionPointProcess* and include it in the **Extension URL** property (the relative URL is *Extensions/ExtensionPointProcess*). Specify the **Type** property by selection of *Process* from the dropdown. Save the Update and close the file. After adding the Extension, the Application will execute and return a response as: 

Hello xxx [ModifyMessageA][ModifyMessage(ExtensionPoint)C][ModifyMessageB].

#### **Native Application Behaviour**
The examples described following illustrate how the Native Application Behaviour may be altered, either modified or enhanced, by Processes defined in external Projects included as dependencies. In environments using Maven dependency management, as in the example described, this is achieved by addition of dependencied to the Project pom.xml File. If the Designer’s environment is using other dependency management tools the example will need to be adapted accordingly.

The current ‘Native Application Behaviour’ is to return the following string when the user enters ‘xxx’ and the variant behaviour of the examples alter the components of the return string as described: 

Hello xxx [ModifyMessageA][ModifyMessage(ExtensionPoint)C][ModifyMessageB].


## Example – Using Process Sets
The Process Sets example behaviour can be observed by importing the *ApplicationHooksProcessSets* Project and editing the pom.xml file in the *ApplicationHooksBase* Project to enable the dependency, which is currently commented out as shown below:

<!-- Comment Out to Disable Process Sets

`  `<dependency>

`	`<groupId>com.enactor.sample</groupId>

`	`<artifactId>**applicationhooksProcessSet**</artifactId>

`	`<version>1.0-SNAPSHOT</version>

`  `</dependency>

-->

![](./Images/Aspose.Words.99359b41-60f2-4f41-88b4-8c097138750b.007.png)

Executing the Application after enabling the *ApplicationHooksProcessSets* dependency alters the native behaviour as shown below: 
Hello xxx [**ParentOverrideA**][ModifyMessage(ExtensionPoint)C][**OverrideB**].

The two Processes *ModifyMessageA* and *ModifyMessageB* are overridden by the new Processes *ModifyMessageParentOverrideA* and *ModifyMessageOverrideB*, respectively.

These overrides are enabled by the presence of two coreProperty elements defined in the configuration file EnactorHome/Config/enactor.xml as shown below:

<!-- For Process Sets Example -->

<coreProperty name="Common.**ParentProcessSet**" value="PARENTOVERRIDE"/>

<coreProperty name="Common.**ProcessSet**" value="OVERRIDE"/>

![](./Images/Aspose.Words.99359b41-60f2-4f41-88b4-8c097138750b.008.png)

Disabling either "Common.***ParentProcessSet***” or "Common.***ProcessSet***" will suppress the override of Processes *ModifyMessageA* or *ModifyMessageB*, respectively.

### **Creating the Process Set Project**

Development of the override Processes in the *ApplicationHooksProcessSet* Project begins with the creation of a Java Project, which if using Maven, can be configured for Maven by applying the Configuration option to ***Convert to Maven Project***. Create the deployments folders as described in section ***The Deployments Folders*** of Chapter 2 using the ***Enactor>Add Deployment Folders*** option of the Eclipse Right-Mouse menu applied to the Project folder (only Process is required) and create a ***com.enactor.sample*** package by applying the ***New>Package*** option of the Eclipse Right-Mouse menu applied to the ***src*** folder.

Under the deployments/Process Folder create the PARENTOVERRIDE and OVERRIDE Folders. The two override Processes *ModifyMessageA* and *ModifyMessageB* in these respective folders are essentially the same as the originals except that the Action Classes they reference, in the new package *com.enactor.sample*, are *ModifyMessageParentOverrideA* and *ModifyMessageOverrideB*, respectively. These actions add the text fragments [ParentOverrideA] and [OverrideB], respectively to the message string.


## Example – Using Extension Points

The Extension Point example behaviour is expressed when the *ApplicationHooksUseExtensionPoint* Project is imported to Eclipse and the *pom.xml* file in the *ApplicationHooksBase* Project is edited to enable the dependency, as shown below: 

<!-- Comment Out to Disable Extension Point Extensions -->

<!--  

`  `<dependency>

`	`<groupId>com.enactor.sample</groupId>

`	`<artifactId>**applicationhooksExtensionPoint**</artifactId>

`     `<version>1.0-SNAPSHOT</version>

`  `</dependency>

-->

![](./Images/Aspose.Words.99359b41-60f2-4f41-88b4-8c097138750b.009.png)

Executing the Application after enabling the *ApplicationHooksProcessSets* dependency alters the native behaviour as shown below: 
Hello xxx [ModifyMessageA][**PREFIX**-][**ExtensionOverride**][-**SUFFIX**][ModifyMessageB].

The *ExtensionPointProcesses* is overridden by the new *ExtensionOverrideProcess*, which writes the [ExtensionOverride] text fragment and supplemented by the *ExtensionBeforeProcess* and *ExtensionAfterProcess*, which write the [PREFIX-] and [-SUFFIX] text fragments, respectively. The order of these text fragments in the message is determined by the **Apply Before Packages** elements of the Package Extensions, which assert that the *ExtensionBeforeProcess* is applied before the ApplicationHooksBase package and that the *ExtensionOverrideProcess* is applied before the SUFFIXExtensionAfter package, which contains the *ExtensionAfterProcess* Extension.

### **Creating the Extension Point Project**

Creation of the *ApplicationHooksUseExtensionPoint* Project for the Extension Point proceeds in the same way as that for the *ApplicationHooksProcessSets* Project described in the previous section, except that the **Extensions** Folder replaces the subfolders of deployments/Process. A new Package is required.
### **Creating a Package**
In the **Description** Tab of the Package Design Editor the A*pplicationHooksUseExtensionPoint* package already exists. Use the Add option to create a package and call it ***SUFFIXExtensionAfterPackage***. Use this same string for the Package ID and Name properties. This Package will be used to contain the *ExtensionAfterProcess* and the Extension that will reference it.
### **Creating the Processes and Action Classes**
Development of the Extension Point Processes is much the same as those of the previous Projects with the exception that the automatic Process Registration will offer the option to choose a package in which to register the Process. ***Only*** the *ExtensionAfterProcess* should be registered in the new *SUFFIXExtensionAfterPackage*.

The *ExtensionOverrideProcess*, *ExtensionBeforeProcess* and *ExtensionAfterProcess* execute the respective Action Classes *ExtensionOverride*, *ExtensionBefore* and *ExtensionAfter* , which are essentially the same as tgose created previously. These Classes append the text fragments [ExtensionOverride], [PREFIX-] and [-SUFFIX], respectively.


### **Creating the Extensions**
In the **Extensions** Tab of the Package Design Editor create three Extensions, all to use the same Extension Point, specifying the value of the *ExtensionPointId* Input to the Extension Point Action (MyExtensionPoint) as the value of the **Extension Point** field. Use an indicative **Name** for each of the Extensions and use the Browse Option search and select to obtain the **Extension URL** value for each Extension. Each should specify **Type** as *Process*.

First select the A*pplicationHooksUseExtensionPoint* package and add two Extensions, one referencing the *ExtensionBeforeProcess* for which the *ApplicationHooksBase* Package should be Added to **Apply Before Packages**. The other Extension should reference the *ExtensionOverrideProcess*, which must add the *ApplicationHooksBase* Package to **Extension Overrides** and the *SUFFIXExtensionAfterPackage* to **Apply Before Packages**.

Then select the *SUFFIXExtensionAfterPackage* and add one Extension, which is to reference the *ExtensionAfterProcess*. Save the changes and close the Packages.xml.


