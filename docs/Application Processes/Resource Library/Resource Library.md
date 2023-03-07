# Resource Library

The Enactor Tools **Resource Library** is an Indexed List of Process Design elements found to be available in the design environment. In the correctly installed Eclipse-Enactor Tools development environment all the built in Classes are available in addition to any Custom elements in the current workspace, including newly created elements. 

The **Resource Library** contains a wide variety of ready-built, stateless Classes available for use in custom-designed Processes. Some of these are stand-alone Classes that perform a specific task in isolation. However, many are designed to serve as elements of a general design pattern, which itself may be applied in a wide variety of custom-designed variants to serve designer requirements. 

## Accessing the Resource Library

The Resource Library View can be obtained, if not already available in the Eclipse Environment, by using the **Window** menu: ***Window>Show View>Other…*** then select ***Resource Library*** from the Enactor Tools folder.

As described previously, during developing the examples, Process Elements may be dragged from the Resource Library into the Process Design Editor Canvas and incorporated into the Process. When this occurs the XML type representing the Process element is inserted into the Process design and specific properties are inferred by the Process Design Editor from the Class that was drawn from the Resource Library. The result is consistent with that had the element definition XML been drawn from the Tools Palette and properties defined manually.

The default panel of the Resource Library View is the global search facility, which contains a sub-panel in which are displayed details of any currently selected element as shown below:

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.9f14a0fc-8561-4fe7-a5cd-f7588fc34d07.001.png)

**Diagram: The Resource Library View – Search Panel**


## Search

Resources may also be searched by Category. By selecting from the Category Selection dropdown at the top-right of the Resource Library View (![](./Images/Aspose.Words.9f14a0fc-8561-4fe7-a5cd-f7588fc34d07.002.png)) the Search can be restricted to an Element type. The searchlight Icon of the resource Library View Panel (![](./Images/Aspose.Words.9f14a0fc-8561-4fe7-a5cd-f7588fc34d07.003.png)) recovers the comprehensive search and select facility. In the case shown below the Actions Category is selected and the elements are further subdivided into folder representations based on the source locations in which the indexe elements were identified:

![Graphical user interface Description automatically generated](./Images/Aspose.Words.9f14a0fc-8561-4fe7-a5cd-f7588fc34d07.004.png)

The three Resource Library Index Element Sources shown in the example illustrated above are:

- **Resource Actions**
  These elements derive from the Project Dependencies, which typically provide access to the Enactor builtin elements.

- **Template Actions**
  These are elements in Custom Template Libraries, which are a prominent topic of this Chapter.

- **Workspace Actions**
  These are elements found in the local Eclipse Workspace and, as can be seen in the example above, are further subdivided into folders representing different projects within it.

Both *Resource Actions* and *Workspace Actions* are associated with actual Classes, builtin or Custom, that exist in the workspace and from which the XML properties required when incorporated into a Process design, can be inferred. ***Template Actions*** are discussed in the next section.


## Templates and their Properties

***Template Actions*** are actual XML element definitions residing in **Template Libraries**.

All the elements that may appear in the Process Design Editor have properties, which are managed in the Properties panel of the Editor. Different element types each have a distinct set of properties, which, after the element is dragged from the Tools Palette, may be configured to define the specific requirements of an instance of the element, as it is to be applied in the Context of the Process.

Elements are also richly configurable as to how they are represented in the Process Design Editor in terms of Colour, decoration and even their associated properties. This level of configuration is normally used to signify distinctive **Types** of elements, which typically associate with a specific, underlying process element such as a Class. A standard set of types is pre-configured as a builtin set in Enactor Tools.
So, for example, all of the Action elements available in the Actions Menu of the Tools Palette are represented by green Icons, among which the End Process element is decorated with a red Stop Sign, by contrast with the Assign Action, which is decorated with a blue ‘=’ sign; these being visual cues as to their function. The two elements also have different properties. Significantly, both has a **Type** property for which the values are ‘*End Process*’ and ‘*Assign*’, respectively, which also appears in the Icon. The ***Type*** property can in fact, be changed after selecting the element into the Editor, thus changing both the appearance and properties of the element, although this is not normally advisable, and the designer needs to be mindful that the underlying Class represented by the element is not automatically changed.

This level of configuration is not normally required for the development or customisation of actions since only a standard set of types, those builtin, is normally required. However, Customers may, for example, develop a Class that is highly reusable across a range of applications and wish to give the element that represents it in Processes a highly distinctive identity in the Tools Palette. This could be achieved by defining a new Type.

However, above the level of Type configuration, a range of pre-configurations based on properties other than Type may be required, for convenience, available in the Tools Palette. Thus, a Tools Palette menu based on a Template Library may be created containing elements derived from the builtin Types but with set values applied in other properties. This is the usual purpose of Template Libraries.

### Template Libraries

Template Libraries contain XML elements of the type that may be included in a Process definition by the Process Design Editor. The elements typically specify an association with some functional element such as a Class and include description of an Icon by which they may be represented in the Process Diagram. When made available to the Resource Library in a workspace the libraries appear as a Menu in the Tools Palette in which the elements they contain are represented and may be dragged into the Editor Canvas.

Template Libraries may also be useful in situations in which a Process design is being developed using elements for which the actual, underlying elements to be used at runtime are not available at design-time. Whereas other Tools Palette and Resource library elements typically represent the actual underlying elements of each category (e.g. the Classes associated with Actions) this need not be the case with Template Library elements; the workspace may contain only the element definition XML.

Of course, the Process Design Editor will detect and flag errors associated with these elements but the errors will not necessarily manifest in a runtime context in which the underlying elements are available.


#### *Using Template Libraries*

Template Libraries may be imported into a workspace and added to the Resource Library to provide design-time definition of elements for use in a Process design. Template Libraries also provide a level of convenience in that they are added as enhancements to the Tools Palette and so the elements they contain become available as Tools Palette Icons, avoiding the need to search and drag them from the Resource Library.
#### *Adding New Template Libraries*

An existing Template Library may be copied into the file-space and the workspace refreshed, after which the ‘plus’ Icon (![](./Images/Aspose.Words.9f14a0fc-8561-4fe7-a5cd-f7588fc34d07.005.png)) of the Resource Library View Panel can be used to select and include it (to become part of the Tools Palette), in the sequence as shown below for *My Templates*, which contains the *MyActions* Group:

![Graphical user interface

Description automatically generated](./Images/Aspose.Words.9f14a0fc-8561-4fe7-a5cd-f7588fc34d07.006.png)

**Diagram: Adding a Template Pibrary to the Resource Library**

#### *Adding Components to a Template Library*

We can now add components to the new library by selecting the ***Add Component*** option in the Create Templates panel. When this option is used the list of components (Process elements) available for selection depends upon the Process currently open in the Process Design Editor. These new elements will become available to drag-and-drop from the Tools Palette.

|![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.9f14a0fc-8561-4fe7-a5cd-f7588fc34d07.007.png)|<p>
![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.9f14a0fc-8561-4fe7-a5cd-f7588fc34d07.008.png)</p><p></p>|
| :- | :- |

Various default settings for these elements including the Palette Icon and the colour of the element Icon in the Process Design Editor may be specified, giving these Custom elements a distinctive appearance, specific names and types etc.

