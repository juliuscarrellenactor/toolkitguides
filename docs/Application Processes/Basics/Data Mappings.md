# Data Mappings

When executing a Process, the Runtime Framework manages the transfer of data during ***Process Flows***, as specified for Input or Output to or from the Process, Action or State. However, these Inputs, Outputs and State Data specifications of Process Elements serve only a *Design Time* Function, providing direction to the Designer and to the Process editor as to data transfer requirements of Process Elements. The data transfers for Process Flows are finally defined according to **Scope**. The saved Process Design then fixes these specific from and to run-time locations for data transfers for use by the Runtime Framework. Thus, the data transfers that occur at runtime are subject to Scope considerations.
## Scope

***Scope*** defines the existence of Data Variables. They may exist and be visible and available only to Actions within a State, yet never included in Process State Data. If specified as corresponding Outputs and Inputs for State-to-State transitions of *Process Flow*s, the Scope defined for Data Variables may span multiple States, yet again, without necessarily being included in Process State Data, available only within the Scope of the relevant States. State Data elements of the same name in a State and the Process define different storage locations at runtime.

## Data Mappings

The Data Transfers that occur at *Process Flow* transitions therefore are defined according to Scope. These transfers are defined based on ***Data Mappings***, which are initially defined implicitly and automatically by the Process Design Editor, which does so by matching up corresponding names among Inputs and Outputs according to nearest Scope (Inputs from State Data in preference to Process State Data and Outputs mapped to both State and Process State Data as available). However, the Designer may require explicitly to specify mappings, overriding these Scope assumptions. Data Mappings may be viewed and modified as required using the ***Mappings Editor***.

## The Mappings Editor

Data Mappings may be viewed and modified as required using the ***Mappings Editor***, which may be accessed from the right-mouse menu. Applied to a State or Action Icon, the Mappings Option of the right-mouse menu has sub options which are available or not according to the Icon (State or Action) and its context. In both cases the ***Clean Mappings*** Option is available, which is discussed in the ***Clean Mappings*** section following. Actions also have a sub-menu option to Edit Action-State Mappings, which may have multiple sub-menu options to multiple States subject to the context of the Action as shown in the example below: 

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.7f049e91-6483-4a41-894e-ef306342b194.001.png)

States have two other sub-menu options to Edit State-Process Mappings and Edit State-State Mappings, which has zero or more sub-menu options to edit Mappings for multiple States as shown below:

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.7f049e91-6483-4a41-894e-ef306342b194.002.png)
##
## Soft and Hard Data Mappings

The implicit mappings of Data Elements, which were automatically and implicitly mapped are referred to as ***Soft Mappings*** and are shown as dotted line arrows in the *Mappings Editor User Interface*, as shown in the example below:

![Diagram Description automatically generated with medium confidence](./Images/Aspose.Words.7f049e91-6483-4a41-894e-ef306342b194.003.png)

**Diagram: The Mappings Editor User Interface**

The Designer may need to override or supplement these mappings. Data Mappings may be modified as required in the *Mappings Editor*, allowing the Designer to override implicit mappings to define mappings between items that are not of the same name (which is permitted and may be appropriate), to override Scope assumptions to map to or from the Process rather than the State (caution! for Inputs this may imply design flaws in process flows) or to add expressions to mappings that change the data during the transfer.

Mappings added or modified manually are shown as solid line arrows and are referred to as ***Hard Mappings***. An option is available, the ***Convert to Hard Mappings*** button, to convert all of the *Soft Mappings* shown in the interface to *Hard Mappings* and the action is reversible using the ***Restore Automatic Mappings*** button, although additions and modifications are lost.

If a State or Action is subject to *Hard Mappings* the State or Action Icon will include a mappings indicator (![](./Images/Aspose.Words.7f049e91-6483-4a41-894e-ef306342b194.004.png)), which can be used to directly by mouse-click to access the Mappings menu.

Input and Output Data Elements are implicitly mapped by the Tools, based on matching Data Names and nearest Scope source (State before Process). Use of the Mappings Option presents a panel to view these Soft mappings, which are shown in dotted lines. These may not be what the designer wants. The panel allows the Designer to explicitly specify new mappings or override Soft Mappings with Hard Mappings, shown with solid lines. 
## The New Mappings

Data mappings are affected by the changed Process Flows and must be modified as described above in section Edit Data Mappings***. However, the behaviour of the Mappings function is slightly different when applied to States as compared to that when applied to Actions. In the latter case, sub-options are presented for mappings to relevant States; for States on the other hand, sub-options are presented for mappings to the Process and relevant other States. This is as expected, since it reflects the scope limitations of Data mappings.

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.7f049e91-6483-4a41-894e-ef306342b194.005.png)
## Clean Mappings

For both Actions and States the Mappings function provides a *Clean Mappings* option. While editing Process Designs, operations such as Adding/Deleting Actions or States, changing Process Flows or Adding/Deleting State Data Items impact data Mappings. In the case of *soft* Data Mappings these impacts are detectable and accommodated automatically by the Process design Editor. However, this is not the case for the impacts affecting *hard* Data Mappings. The presence of invalidated hard Data Mappings is indicated in the Action or State Icon with a red ‘x’ indicator (![](./Images/Aspose.Words.7f049e91-6483-4a41-894e-ef306342b194.006.png)).

Thus, when the Mappings option is selected for the new *Message Created* State the Process Design Editor detects that *hard* mappings previously applied to the new *Modify Message* Action are no longer valid and prompts to remove them.  Select OK and proceed:

![Graphical user interface, application

Description automatically generated](Aspose.Words.7f049e91-6483-4a41-894e-ef306342b194.007.png)

These hard mappings will be removed ant the function will continue to the Mappings Editor Panel.


#### **The Soft Mappings Alternative**

Consistency of names of Data Items used in passing data between Actions and States is optional and not always possible or appropriate but where names are consistent the Process Design Editor uses equivalence of names of Inputs and Outputs as a basis for assumptions of convenience to automate application of data mappings as shown below (where the Output Item of the *Modify Message* Action is named *Message* rather than *ModifiedMessage*):

![Diagram Description automatically generated](./Images/Aspose.Words.7f049e91-6483-4a41-894e-ef306342b194.008.png)

Notice that the system has automatically mapped the *Message* Data Item from *Main Prompt* State to the new State and back and similarly from the new *Message Created* State to the *Modify Message* Action Input and back from its Output as shown in the combined image below.

These are shown in dotted lines as *Soft* Mappings, which is the default behaviour based on matching similar names. The default action may be overridden by deleting or changing the mapping. 

The modifications are now complete, and the new Process Flow should appear as shown in the earlier section ***The Modified Example Process***. The Application can now be executed to observe that the outward behaviour remains unchanged.

