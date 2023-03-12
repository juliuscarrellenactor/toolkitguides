# Listing Entities

This chapter describes Enactor Tools provisions for extracting lists of Entities from persistence. Previous discussion of Enactor Entities chapters has focussed on the individual Entity and instance, highlighting the means to design and use them in Processes, which perform the capture of their properties in User Interfaces and apply the Persistence Layer to create, delete or to read and update an individual instance. However, applications also require means for efficient extraction and processing of often large lists of Entities or combinations of related Entities from persistence, for review and selection or bulk processing, which may involve selective extraction with facility to include or exclude based on the values of properties of multiple Entities. This chapter describes both the tools available to the Application Process Design level to selectively extract Lists and the means to design, define and implement the Lists available.

## Enactor Entity Listing Functionality

Good software design typically involves hiding complexity in layers with concise interfaces between them such as to allow that each layer is accessible for use or modification without the need for detailed knowledge of the implementation of the layer below. This strategy is applied in Enactor Tools Listing Functionality.  For Application Process Design Editors listing from Entities is simply a matter of specifying a required list and the selection filters to obtain the List in a standard format. However, at the deeper layer of complexity, Enactor Tools also provides for the design of lists and filters, which hide the complexity of table joins and selection logic, to enhance the range of Listing Functionality available to the Application Process Design level. The layer of List design is, in turn, free of the complexities of constructing SQL syntax or managing the data returned from queries. The Application Process Design Editor’s view of this functionality is the **Entity Server Definition**, which identifies the **Lists** available to the application and the **Filters** used for selection and a set of Enactor builtin List-related Actions used to access them. Add Filter Actions select the filters and provide selection criteria and other information then apply the List Criteria to a Load List Action which returns the data; Lists appear to be drawn from a single Entity. The List design view is the **Entity Server**, which uses information provided by the Application Process *via* the List-related Actions and based on the Server Definition, to construct the required Join objects and use them, along with the List Criteria, to access the lower, Persistence Layer implementation. New Lists and Filters can be made available to Application Processes, or existing Lists and Filters modified, by enhancement or modification of the Entity Server and the Entity Server Definition.
## Enactor Entity Lists

Before proceeding, a fundamental point to note regarding Enactor Entity design is the distinction between data stored in table columns and that stored in XML, a designed-in distinction that delivers runtime efficiency. **Only Entity properties persisted in table columns are accessible to the Listing Functionality.** This applies both to the properties that can be extracted in Lists and to the properties that can be used in Filters.

Application Processes use a pre-defined, **Named** **List**, associated with an Entity to extract data from persistence. The data is returned as a list (of type java.util.list), the composition of which is described in detail in the following section, and which can be used as list input to Actions, States and Page Definitions; in particular, the ***Data Table*** control, which provides a convenient vehicle for list data presentation in User Interfaces.

Later discussion in this chapter will examine how *Named Lists* are defined and implemented. For the present we will first attend to how *Named Lists* are *used* in applications and the basis of this discussion and example will be the default, builtin List. The Enactor Tools Entity wizard always creates a default *Named List* called **ListAll**. This list will be used as a basis for example.

The *ListAll* list is present in the Entity Server Definition of *Employee*, which has been created as part of the example under development in previous chapters. This example will be extended to apply it to list all column data of the subclass *Manager*.

At the Database Mappings stage of wizard Entity Creation or re-definition, properties of the Entity that are selected for representation in the Mapping File, to be explicitly persisted in table columns (i.e. the column-exposed properties of the Entity) are also available to selection for inclusion and use in the *ListAll* List. Checkboxes are provided, as illustrated following, to specify the treatment of each of the mapped properties in relation to the *ListAll* default list. Any of these properties may be independently nominated, using the ***Include in List Methods*** CheckBox, to be included in the list returned by *ListAll* and/or as a filter, using the ***Include in Filter*** CheckBox. If nominated as a filter a runtime value, usually derived from a User Interface, may be specified for the property and used as selection criteria for extraction of instances of the Entity from persistence and inclusion in the *ListAll* list. The Entity wizard can be re-run to review or revise these settings.

|![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.1b0b1917-0a0e-442d-a5c4-949106a81982.001.png)

Specifying the ListAll Default

If the Include in List Methods CheckBox is checked the property will be nominated for return in lists generated by the ListAll list. If the Include in Filter CheckBox is checked the property will be available to the Application Process for specifying values in lists generated by the ListAll list. These CheckBoxes apply only to properties selected for table column mapping.

![Graphical user interface, text Description automatically generated](./Images/Aspose.Words.1b0b1917-0a0e-442d-a5c4-949106a81982.002.png)

## Structure of Entity Lists

When an Entity List is used in an Application Process the Entity instances are returned as a list of ***Keyed List Elements***. Each list element contains a **key** property, which is the *EntityKey* of the instance, and a **data** element, which is a mapped collection of properties of the Entity for which the mapping key is the name of the property. Individual properties of the data element may be referenced either as *data.propertyname* or *data[‘propertyname’]*. Properties of the Entity present in the ***data*** element of the keyed list will be restricted to those that are persisted in table columns and, in the case of the *ListAll* list will be those flagged with the CheckBox to *Include in List Methods* during Entity creation.
## Using Lists in Application Processes

The ***ListAll*** named list is available by default for the *Employee* Entity, which was created as part of the example under development in previous chapters. The subclass Entity *Manager* also uses the Entity Server and Server Definition of *Employee* and thereby has access to the same *ListAll* List, which can now be used to extend the example to provide a means to list all column data of *Manager*. The subject of how the *ListAll* list is defined will be discussed in the next section (The Server Definition*** File). **Note** that the design is built around reference to the subclass *Manager* in anticipation of further extension of the example to come, which will illustrate how the existing *ListAll* list associated with *Employee* is amenable to modification and use limited only by the range of properties that are mapped to Columns of the Table of *Employee*.

A suggested design involves the addition of a ***ListAll*** option to the Key Input Prompt of the example Action and mapping the ***ListAll*** Event to a Call Process Action, which will perform the list function in a separate Application Process, Prompt State and Page Definition.

The ListAll Event

The added ListAll button control, cued visually as being independent of Key input, generates the ListAll Event upon which the Process Flow is mapped to a Call Process action as described following.

![Graphical user interface, text, application Description automatically generated](./Images/Aspose.Words.1b0b1917-0a0e-442d-a5c4-949106a81982.003.png)|

The new Page Definition within the Called Process (illustrated following) provides a pair of input fields for capture of values for the List filters, which are associated with a *List* Button Control. The Actions associated with the *List* Event deployed in the Called Process direct and exercise the *ListAll* List Function of the Entity, returning the List of instances to the Prompt for display in a Data Table.

The List Event

The List button control is associated with a pair of input text controls, which capture the selection criteria. The List Event Process Flow is mapped to Actions that exercise Entity List functionality.

The following diagram illustrates the addition of the new *CallListAll* Action to the main Application Process, shown in the diagram in fully expanded *Style*. All the operations required to create the new process and drag it from the Resource Library as a called Process have been described in previous chapters.

![A screenshot of a computer Description automatically generated with medium confidence](./Images/Aspose.Words.1b0b1917-0a0e-442d-a5c4-949106a81982.004.png)

The new Application Process, *EnactorEntities/EnactorEntitiesListAll*, referenced in the ***Execute Process ID*** property of the *CallListAll* Action, requires no Input Data Items and returns no Outputs. It contains a Prompt State and associated Page Definition, *EnactorEntities/EnactorEntityListPrompt*, which accepts selection criteria and contains a *List* Button Control. The new Page Definition can be created anew, by applying the right-mouse-menu option *New>Other>Enactor development>Page Definition* to the *EnactorEntities* subfolder of the Project *deployments/Process* folder or Copy and Paste of one of the existing Page Definitions (to re-use design features for consistency).



The three Actions that implement the *List* function, as illustrated in the following diagram, are available in the Enactor Resource Library to be dragged into the Process Design Editor Canvas and tailored to the requirement. First however, we will examine the detailed requirements of the Page Definition.

![Graphical user interface, application Description automatically generated](./Images/Aspose.Words.1b0b1917-0a0e-442d-a5c4-949106a81982.005.png)

### **The Page Definition and Data Table**

The new Page Definition captures the values supplied as the *DefaultValue* input to the add filter actions and delivers the list returned by the Load List for presentation in a Data Table, which requires a row index. It therefore requires the following four Declared Variables:

- Two variables to receive User Input values for filters 
  (Employee Number and Surname of type java.lang.Integer and java.lang.String)
- A variable of type java.util.List  to receive the Entity List returned from *ListAll*
- A single variable of type java.lang.Integer to store the Data Table row index.

Significant properties of the Data Table used to present the List are:

- The ***Data Expression*** property is set to *#{entityList}*, where *EntityList* is the name of the java.util.List variable returned by the *ListAll* Action
- The ***Row Index Variable Name*** is set to *rowID*, which is the java.lang.Integer variable declared for the purpose above
- ***Vertical Scrollbars*** should be set to ‘When Needed’ allowing for a limited window into the list of Entity instances returned
- The ***List Item Variable Name*** can be specified as ‘row’ and may be used as a reference to the row elements of the Data Table.

As the Data Table is being used only for display, *Row selection* need not be enabled. The properties from the returned list can be referenced within the context of the Data Table based on the *List Item Variable Name* that was specified for the purpose, as follows:

- To reference the key (which we do not require in this example):
  #{row.key} 
  Note that this is the *EntityKey* of the instance, which could be used to retrieve the Entity in a “search-and-select” design, for example, by returning the key to the calling process.
- To reference the Data Elements returned (by property name):
  *#{row.data["propertyName"]}* or *#{row.data.propertyname}*.

To reference the elements of the returned list outside the context of the Data Table (which we do not require in this example) the List object can be accessed directly using an index, for example, using the Declared Variable RowID specified as *Row Index Variable Name* and maintained by the Data Table if the *Row Selection Enabled* property is true, as follows: 

- To reference the key: *EntityList[rowID].key*;

- ` `To reference the Data Elements returned (by property name)
  *EntityList[rowID].data["propertyName"]*.

### **The Process Elements**

The Process Elements used to implement the *ListAll* function include first a pair of ***AddSimpleListFilterAction*** Elements, which construct and populate a *ListCriteria* object then supply it as Input to the ***LoadListAction***, which uses it to load the *EntityList*.

Any or all of the properties of the Entity that were nominated to *Include in Filter* in the Entity wizard can be applied as selection filters to the list (namely *Number* and *Surname*). Each of the selected properties and their specified value is added to the *ListCriteria* object, which is constructed in the initial call to the ***AddSimpleListFilterAction***. The *ListCriteria* object is returned as output from each call and passed as input to each subsequent call and finally to the ***LoadListAction***, which extracts the list from persistence returning the List object as Output. 

All of these Actions accept as Input the *EntityName*, *EntityNamespace* and *ListName*, all of which can be specified as fixed Input Parameters (using SHIFT-double-mouse-click) as applied in previous chapters. Either the *EntityName* and *EntityNamespace* or the *EntityServerName* are necessary as means to identify the Entity and its server to the Load action. If *ListName* is unspecified the default ListAll applies. If specified in the filter these inputs restrict usage of the filter to the Entity and/or list specified and if not matched in the Load Action the filter will be ignored. The *FilterId*, *FilterType* and *DefaultValue* specify the required filter and value source. Note that the *FilterType* for the *Number* property of *Employee* is ***IntegerValueFilter***, the Surname filter is ***TextValueFilter***. 

The *DefaultValue*, in this example, derives ultimately from User Input to the Page Definition. Declared variables of the Page Definition have been mapped to Input Text Controls, which capture User Input values for the filters. These map to the Prompt State as State Data Items and on in turn, to the *AddSimpleListFilterAction*s as the *DefaultValue* Input Data Items. **Note** that because the *Number* property is an Integer type that is set to zero if null (because *public int getNumber() { return (number == null) ? 0 : number; }*) we are not able to allow null to signify ‘no value entered’ (which would actually filter for a zero occurrence). We therefore set a non-zero condition on the flow to create the Number filter and bypass it otherwise.

The *FilterId* derives from the definition of the *ListAll* list in the Entity Server Definition, which associates it with the property or properties to be used with this filter and the *FilterType* accepts one of a set of identifiers used to qualify how the filter should be applied. The Server Definition File, from which can be obtained the *FilterId*, is discussed in the next section. The subject of *FilterType* is also better deferred until discussed in the context of the Server Definition. However, a list of ***Enactor builtin Filter Types*** has been included. For the current example the two *FilterId* values available are *Number* and *Surname*, which can be simply applied using the *FilterType* values already mentioned. The *TextValueFilter* applies to filter properties of string type and by default, uses a simple equality match.

The properties of the Prompt State, *Keep Prompt Open* and *Single Instance* must be set to False. This provides that the in-memory version of the Page Definition will be destroyed when the additional *ReturnList* State is entered. Hence, the Prompt State and Page Definition will be re-created and populated from the Process State Data Item with the contents of the List element created by the *LoadListAction* when the Process Flow returns.
