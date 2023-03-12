# Entity Relationships and Persistence

This chapter deals with more advanced features of Enactor Entities, the Relationships between Entities and their Persistence. Entities may be Sub-Classed, contained in other entities or maintained in conjunction with other, associated Entities. When Entities are maintained in an association it is often necessary to persist them in atomic transactions. These issues will be dealt with in some depth in the present chapter.

# Polymorphic Entities

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

In the Entity Generator page specify an Entity Name (***Manager***) for the new Sub-Class Entity. Check that the Namespace and Prefix information are correct and if not, uncheck the *Derive names* CheckBox and apply these names from PackageInfo as described in ***Entity Identification******. We can now specify the SuperClass information for the Entity.


Using the **Browse** buttons associated with the Super-class *Interface* and *Implementation* fields we can access a search-and-select panel to obtain the references to the *Employee* Interface and implementation. Type in ‘***I**Employee’* and ‘*Employee’* to the Select entries field of the interface and implementation panels, respectively then select the appropriate match:

![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.07519e48-8839-4abb-9179-b67c96768f60.003.png)

![Graphical user interface, text, application, email Description automatically generated](./Images/Aspose.Words.07519e48-8839-4abb-9179-b67c96768f60.004.png)|

|![Graphical user interface Description automatically generated](./Images/Aspose.Words.07519e48-8839-4abb-9179-b67c96768f60.005.png)

**Entity Settings**

In the Entity Settings page uncheck the Keyed and Timestamped CheckBoxes; the Sub-Classed *Manager* will inherit these properties from the Super-Class.<(**Note**: Sub-classed Entities can be separately keyed and mapped to a different table as discussed later). Click on ***Next***.

Click ***Next*** in the **Files to Generate** page.

The **Entity Properties** cycle now commences of specifying a list of property names followed by specification of their Java and XML Characteristics (as described in Entity Properties*** Nomination and subsequent sections). Here, we define the single property that is specific to the *Manager* Sub-Class.

|![Graphical user interface Description automatically generated](./Images/Aspose.Words.07519e48-8839-4abb-9179-b67c96768f60.006.png)

Entity Properties

In the Entity Properties page add a single property, call it ManagementLevel and specify its Java characteristics only as String.


There is nothing further to specify in the **Additional XML Settings** page; click on ***Finish***.



