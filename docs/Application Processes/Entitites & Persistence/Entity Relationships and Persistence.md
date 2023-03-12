# Entity Relationships and Persistence

This chapter deals with more advanced features of Enactor Entities, the Relationships between Entities and their Persistence. Entities may be Sub-Classed, contained in other entities or maintained in conjunction with other, associated Entities. When Entities are maintained in an association it is often necessary to persist them in atomic transactions. These issues will be dealt with in some depth in the present chapter.

## Polymorphic Entities

One of the principal considerations in the design of Enactor Entities is the need to accommodate business entities that have diverse variants, each having specific attributes yet manageable in the application based on their commonalities. This requirement is typically accommodated in Enactor by Sub-Classing Entities.

## Sub-Classing Entities

An Entity is a Java Class and as such, can be Sub-Classed. Sub-Classing of persisted Entities is most readily accommodated if the additional properties of the Sub-Class are persisted in the XML, which necessitates that an XML column exists in the Table. The properties of the wizard-generated Entity Sub-Class not in common with the base class, are mapped to and stored **only** in the XML, which is mapped to a single XML column of the table based on JAXB Java annotations of the Sub-Class properties. The properties of the Entity Sub-Class may also be persisted in table columns by manually providing for them in the Mapping File of the Entity.

The essence of Entity Sub-Classing is that in general, Sub-Classed Entities containing data variants are persisted in the same table with the same Entity Key and share a common Entity Server and Mapping File. This generality is not a rule, however. An Entity that is foundationally equivalent to and shares common, core properties with another may be created as a Sub-Class of that entity, yet separately keyed and persisted by its own Entity Server and Mapping File for other, architectural reasons. This discussion will first deal with the more general case as a basis for explanation and example before considering more specific variations.

The following discussion will describe the use of the Entity wizard to create Sub-Classed Entities and the optional or required manual operations involved in their design and creation. In the development of an example we will explore the essential elements of Enactor Tools required to implement Entity Sub-Classing.

### **Creating a Sub-Class Entity with the Entity Wizard**

In applying the Entity wizard to define this general type of Sub-Classed Entity it is up to the designer to ensure that the Super-Class provides for an XML Column (without it, the additional properties specific to the Sub-Class will not be persisted at all unless explicitly mapped). The provision for an XML Column was specified during creation of the Super-Class Entity (see Specifying Database Mappings***), or can be ascertained from the entity Mapping File by double-mouse-click on the **YourEntity.xml** file under the ***EntityMapping*** subfolder of deployments in the Project pane and look for the XML Column (see below): 

``` xml title = "YourEntity.xml"

<core:property>

`	`<core:columnName>XML</core:columnName>

`	`<core:propertyName>XML</core:propertyName>

`	`<core:columnType>CLOB</core:columnType>

`	`<core:persistenceType>0</core:persistenceType>

`	`<core:isObjectXML>true</core:isObjectXML>

</core:property>

```

![](./Images/Aspose.Words.07519e48-8839-4abb-9179-b67c96768f60.001.png)

Alternatively, use MySQL to query the table, for example:  *show columns for Employee;*. 

If the column is absent it can be added by re-visiting the Entity Wizard as described in the previous chapter, using **YourEntity>Details.xml* and check the ***Add an XML Column*** CheckBox at the Database Mappings stage.

In the *EnactorEntities* example project we can use the *Employee* Entity as the Super-Class for a new *Manager* Sub-ClassEntity; a variant of *Employee* that has some additional properties. To begin, rightmouseclick on the child package that contains the original *Employee* Entity and invoke the Entity wizard as described in section Creating a Keyed Entity with the*** Entity Wizard (**New>Other>Enactor Development>Entity**). 

We will apply the Entity wizard in a sequence that creates a new, non-keyed Entity, references another Entity (its interface and implementation) as its Super-Class and defines the properties that are specific to the Sub-Class. There is no Database Mappings phase since the Entity is non-keyed.

In the **Generation Type** page select *Generate from Scratch* and in the **Entity Type** page select *Java Entity*.

It is in the **Entity Generator** stage, where the Entity Name is provided, that a Super-Class Interface and Implementation may also be specified, as follows:

![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.07519e48-8839-4abb-9179-b67c96768f60.002.png)

**Entity Generator**

In the Entity Generator page specify an Entity Name (***Manager***) for the new Sub-Class Entity. Check that the Namespace and Prefix information are correct and if not, uncheck the *Derive names* CheckBox and apply these names from PackageInfo as described in ***Entity Identification***. We can now specify the SuperClass information for the Entity.


Using the **Browse** buttons associated with the Super-class *Interface* and *Implementation* fields we can access a search-and-select panel to obtain the references to the *Employee* Interface and implementation. Type in ‘***I**Employee’* and ‘*Employee’* to the Select entries field of the interface and implementation panels, respectively then select the appropriate match:

![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.07519e48-8839-4abb-9179-b67c96768f60.003.png)

![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.07519e48-8839-4abb-9179-b67c96768f60.004.png)|

![Graphical user interface Description automatically generated](./Images/Aspose.Words.07519e48-8839-4abb-9179-b67c96768f60.005.png)

**Entity Settings**

In the Entity Settings page uncheck the Keyed and Timestamped CheckBoxes; the Sub-Classed *Manager* will inherit these properties from the Super-Class.<(**Note**: Sub-classed Entities can be separately keyed and mapped to a different table as discussed later). Click on ***Next***.

Click ***Next*** in the **Files to Generate** page.

The **Entity Properties** cycle now commences of specifying a list of property names followed by specification of their Java and XML Characteristics (as described in Entity Properties*** Nomination and subsequent sections). Here, we define the single property that is specific to the *Manager* Sub-Class.

![Graphical user interface Description automatically generated](./Images/Aspose.Words.07519e48-8839-4abb-9179-b67c96768f60.006.png)

Entity Properties

In the Entity Properties page add a single property, call it ManagementLevel and specify its Java characteristics only as String.

There is nothing further to specify in the **Additional XML Settings** page; click on ***Finish***.

The changes to the main Process design are shown below; separate ***CreateEmpl*** and ***CreateMgr*** Button Controls replace ***Create*** in the original Page Definition for the Main Prompt. After modifying the Page Definition use the right-mouse-menu on the Prompt State to select ***Synchronise>Events with Prompt*** as a convenient way to update the Prompt State to reflect the changed Events. The new Actions can be created using the *Select-Copy-and-Paste* operation to duplicate and then rename the *CheckEntityExists* and *CreateEntity* actions. Aside from renaming the Actions to reflect they refer to Manager the only change required is to redefine the **EntityName** Input Parameter value to *Manager*; to do this hold down the SHIFT key and double-mouse-click on **Inputs** in the *CreateEmployeeAction* Icon. 

![A screenshot of a computer Description automatically generated with low confidence](./Images/Aspose.Words.bd7aebec-94b2-4fad-b416-40ff1d1ebcab.007.png)

No change is required at the Process level in the Called Process. However, the Page Definition must be altered both to differentiate the Entities *Employee* and *Manager* and to capture data for *Manager* as appropriate. 

### **Adding Sub-Class Entity Columns in the Mapping File**

As mentioned, the Entity wizard-generated Sub-Classed Entity maps all of the Sub-Class properties to XML (if there is no XML column they will not be persisted). However, it is often desirable to store some or all of the Sub-Class properties in columns. Mapping File entries are required for these properties and can be manually added to the Mapping File by the designer.  The diagram below illustrates  the elements that need to be accessed in order to do this:

![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.bd7aebec-94b2-4fad-b416-40ff1d1ebcab.008.png)

1. By double-mouse-click on the Employee.xml file icon under EntityMapping the Mapping File for Employee can be accessed for **edit**

2. By double-mouse-click on the Manager.java file icon under the enactorentities package Java File for Manager can be accessed to **obtain information** (3) and (4)

3. This is the definitive source of the namespace-derived qualifier for *class name*

4. This is the definitive source of the *Entity name*.

Edit the Mapping File *Employee.xml*. 

A **core:property** tag for the *Manager* property ***managementLevel*** must be added to the Mapping File so that the Entity Server will map this property to/from the database table column during persistence operations. Of course, this will impact the database table format and the automatic upgrade of the table will also be described in this section.

While numerous sub-elements apply to the *core:property* tag (as described in ***The Mapping File***) only seven are required in this case, six of which we can obtain by copy-and-paste from the *core:property* entry for *Surname* already in the file. The six elements are ***columnName***, ***propertyName***, ***columnType***, ***persistenceType***, ***allowNull*** and ***length*** (all prefixed by core:) and the additional element is ***applicableClassName***. 

To briefly describe these elements they are:

- **columnName**
  A table-definition and runtime directive indicating the database name of the column and which column the property maps to, respectively. The convention of initial-uppercase-character in underscore-separated name elements is used
- **propertyName**
  A runtime directive indicating, by correct class property name, which property is being mapped to the column
- **columnType**
  A table-definition-time directive indicating the data type of the column (STRING)
- **persistenceType**
  A runtime directive indicating 0 (Read Only; applied only on reads), 1 (Write Only; applied only on Save) or 2 (Read/Write)
- **allowNull**
  A table-definition-time directive indicating if the column should allow null value
- **applicableClassName**
  A runtime directive indicating that the mapping only applies if the Entity involved in the persistence operation is of the specified (Entity) class. This can be obtained definitively from the Entity Java class as indicated in elements 2, 3 and 4 of the illustration above; in this case the mapping only applies for ***com.enactor.sample.enactorentities.Manager***. 
- **length**
  Size of the column in bytes.

**Note** the pattern of the repeating sequence of <*core:property*> tags in the Mapping File XML and add the new occurrence immediately after the entry for *StartDate* of *Employee*. The order of *core:property* tags defines the order of columns in the table.

``` xml title="Mapping.xml" 

<core:property>
    <core:columnName>Management\_Level</core:columnName>

    <core:propertyName>managementLevel</core:propertyName>

    <core:columnType>STRING</core:columnType>

    <core:persistenceType>2</core:persistenceType>

    <core:allowNull>true</core:allowNull>

    <core:length>40</core:length>

    <core:applicableClassName > com.enactor.sample.enactorentities.Manager	</core:applicableClassName >

</core:property>

```

![](./Images/Aspose.Words.bd7aebec-94b2-4fad-b416-40ff1d1ebcab.009.png)


### **The Schema Manager**
A feature of the **Enactor Runtime Framework** is the **Schema Manager**, which automates persistence aspects of Application Upgrades. At the simplest level, which is the default action of the Schema Manager, is the upgrade of a table. More sophisticated actions (beyond the scope of the present discussion) involve the execution of specified classes to perform upgrades and the application of multiple upgrades, each having a designated applicable version and post-upgrade version number. However, in the default action, as is the case for the present example, the Schema Manager renames the existing table, creates a new table based on the column and key specifications of the Mapping File, copies the data to the new table then deletes the old table.

**Note** that the new property allows null values

``` xml
 (*<core:allowNull>true</core:allowNull>*).
 ```
 
  If this were not the case, then a custom upgrade class would need to be written and invoked to populate the new column. 

The trigger for the Schema Manager to update the table is the **core:version** tag of the Mapping File. During start-up of the first execution of an application the table is created, and this value is populated to a Schema Versions table, which is maintained by the Enactor Runtime. During start-up of subsequent executions, the *core:version* tag of the Mapping File is compared with the stored value to detect and process version upgrades. In the present example the *core:version* value is set to 1.0 by the Entity wizard when the entity is created and after adding the new column should be incremented (to say, 1.1) to reflect the new version. 

If the application has been executed the table will have been created and this value will have been stored; the Schema Manager will upgrade the table. Otherwise, the table will be created new and conformant with the current version of the Mapping File. Either way, the *core:version* tag of the Mapping File will be used to populate the Schema Versions table.

To give effect to this Schema Manager processing, edit the Mapping File and increment the *core:version* tag value:

``` xml title="Mapping.xml"

<core:mappedEntityName xmlns:ns8="http://www.enactor.com/EnactorEntities">

ns8:Employee</core:mappedEntityName>

<core:mappedEntityKeyName xmlns:ns8="http://www.enactor.com/EnactorEntities">

ns8:EmployeeKey</core:mappedEntityKeyName>

<core:version>1.1</core:version>

<core:updateMode>UPDATE\_CURRENT</core:updateMode>

<core:usesExistingTable>false</core:usesExistingTable>

```

![](./Images/Aspose.Words.bd7aebec-94b2-4fad-b416-40ff1d1ebcab.010.png)

Automatic addition of the *Management\_Level* column of the Sub-Class *Manager* Entity to the Employee table by the Schema manager is illustrated in the before and after listing of columns in MySQL shown below:

Before: After: ![Graphical user interface Description automatically generated](./Images/Aspose.Words.bd7aebec-94b2-4fad-b416-40ff1d1ebcab.011.png)

## Entity Sub-Classing Overview

The example described above used the fundamental and most generally applied definition of Sub-Classed Entities, but other variations are possible with the principal determinant being whether the Sub-Class and/or the Super-Class is/are independently keyed and persisted Entities. The Super-Class need not be a Keyed Entity; indeed, the Super-Class need not be an Entity at all. 

If neither the Sub-Class nor the Super-Class is a Keyed Entity only the principal function of Entities accrues to the classes namely, to provide for XML-serialisation based on JAXB annotations. If the SuperClass is not an Entity, provisions for its serialisation, typically by addition of JAXB annotations (although other methods exist), is required and must be manually applied, otherwise the properties of the superclass will be omitted.

The general case of the Non-Keyed Entity derived from a Keyed-Entity Super-Class has already been examined. However, if the SubClass is specified as a Keyed Entity it will be independently persisted based on its own *EntityKey*, *EntityServer*, Mapping File and Table, regardless if the SuperClass is a Keyed, Non-Keyed or Non-Entity. SubClassing the Entity in this case amounts to a convenient, design-time facility to capture properties in common with and based upon the Super-Class Entity. This carries no implication, neither about the source of data which populates these properties in any process nor about where or how the data of the two Entities is persisted. Nevertheless, although these properties of the SubClass will be persisted in XML (if an XML column exists), mapping these properties to table columns must be enabled in the Entity wizard using the provision to ***Allow Mapping of inherited properties***, which is a CheckBox adjacent to the ***Add an XML Column*** CheckBox at the Database Mappings stage. **Note** that none of the inherited properties are available in the wizard for nomination as a Key property.
