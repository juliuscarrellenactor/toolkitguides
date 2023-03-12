# Entities
## Introduction 

Software applications typically model real-world scenarios based on Entities, which are things of interest in the scenario being modelled, their attributes and their relationships. In Enactor Tools Applications Entities are defined and processed as Java Objects. Entity and Entity Key Classes are much like Java Beans. However, they extend interfaces that integrate them with a persistence ifrastructure that implements an Enactor Object Relational Model.

The Entity-specific elements that integrate them with the persistence infrastructure are created by the Tools Entity Designer. The diagram below illustrates these elements and their interaction with Application Processes in the context of other Design Elements, which are described in **Part III**. The diagram illustrates how Process Actions and the Classes they represent, may use an Entity Server Class to create, persist and access Entities in the database.

![A screenshot of a social media post Description automatically generated](./Images/Aspose.Words.b59689d8-c423-4987-a9d6-e7cb9d4fc7b2.001.png)

**Diagram: Enactor ToolSet Designers; Processes and the Entity Designer**

The properties of Enactor Entities store the attributes of real world entities being modelled such as Address, (with Street and PostCode properties) and Product (with Product number and description properties). Enactor Entities can represent themselves in XML format and are able to re-construst themselves from XML. The Enactor Runtime Framework includes an Object Relational Mapping (ORM) system and most Entities can be persisted in databases. At the time of writing Enactor supports Oracle, MySQL, SQLServer, DB2 and Derby databases. The Entity Designer, as shown in the diagram, is the tool that creates (or re-creates) the classes and design elements involved in the ORM and used by Entity-related Process Actions. These elements and their usage are the subject of the Chapters of **Part III**.


## Enactor Entities, XML and ORM 

Enactor Entities are java classes. They extend the Enactor **IEntity** interface or one of the extensions of it, which in turn extends the Enactor **IXMLSerialisable** interface. Hence the principal characteristic of Entities is that they are serialisable as XML based on JAXB class annotations they contain about their properties. They also have awareness of their fully qualified name. 

XML is a widely used data description technology, which facilitates interoperability within and between systems and with external parties. XML is also a suitable format for serialisable elements and for which well-established, open source technologies exist for un-marshalling and marshalling to and from class objects. Enactor uses the Java Architecture for XML Binding (JAXB), which offers bi-directional capability to generate XML Schemas and data items from existing Java Classes.

Entities that are persisted must also meet the requirements for database persistence. These requirements are (for database implementation):

1. **Keying**
   If tuples must be individually identified and retrieved from persistence:
   1. Every tuple in the table requires a guaranteed unique database key 
      (locally implemented by an auto-allocated key or globally by a GUID)
   1. Every instance of a business Entity must be uniquely business-identifiable in storage by way of a business key (or else by the database key)
1. **Column Data** 
   1. Attributes that are the basis of searching or filtering of instances for retrieval from the database must be individually present in the table as columns
   1. Attributes stored as individual columns that are frequently the basis of searching must be indexed for efficiency
1. **XML**
   1. If individual mapping of all properties of the class to table columns is to be avoided, those elements not required as columns must be stored in the XML (an XML Column)
   1. If unnecessary re-marshalling of properties from the stored XML is to be avoided the stored XML must include *all* business attributes of the entity, including those also stored as columns.

To accommodate these requirements, every Enactor Entity that is persisted (and is therefore keyed) is associated with two other classes specific to the Entity; an **Entity Key** and an **Entity Server**. The Entity Key is a property of the Entity; an object of a class specific to the Entity, which implements the **IKey** interface and, like the entity, has a property that is the fully qualified name of the Entity and can therefore be instantiated independently with awareness of the Entity with which it is associated and used to instantiate the Entity in Create actions. An application may supply an Entity or its Key to the persistence layer for persistence-related operations. Either object can provide the ***EntityQNAME***, which the persistence layer uses to identify the appropriate, entity-specific **Entity Server** to execute the access. The Entity Server extends the **IServer** interface, which mandates the methods of persistence-related functionality. Persistence is typically, but not necessarily applied based on the **Enactor-ORM** implementation. These operations are illustrated on the following page.

### **Entity Persistence**

In summary then, Entities are the central elements of the Enactor Data Model. Principally it has an XML representation that serves as a transmission and persistence interface and a Java interface used by the runtime systems. Entities are the objects understood by user interfaces, as Java classes they are the currency of processes and finally, using the Entity Server interface, they can be persisted by means that are flexible. This Chapter is concerned with how Entities are defined, used and persisted.

The diagram below illustrates ***generic*** persistence layer access by the application using an Entity or its Key, either of which provides the means, independently, to identify the appropriate persistence server. The Framework provides ORM implementation and a file-based system for Entities that do not need to be stored in a database.

![Diagram Description automatically generated](./Images/Aspose.Words.b59689d8-c423-4987-a9d6-e7cb9d4fc7b2.002.png)

**Entity Persistence**: Flexible Framework options for Entity persistence

The **Entity** class is defined at design time by the **Enactor Entity Wizard**. If an entity is defined as Keyed (i.e. persist able) the **Entity Key** and an **Entity Server** classes are also created by the wizard. 


## The Mapping File and Enactor-ORM 

Whereas JAXB uses Java annotations to provide information for the creation of an XML representation of an Entity class and its properties, Enactor-ORM uses an Entity **Mapping File** to provide the implementation details of Entity persistence. Every persisted Entity is associated with a Mapping File, which is created at design time in a project sub-folder of ***META-INF/deployments/Entity Mapping*** and maintained by the **Enactor Entity Wizard**. Mapping Files are XML files and they may also be manually modified. Essentially, the Mapping File elements associate an Entity with a Table and each mapped property of the Entity with a column of the table. 

A Mapping File contains a set of Entity-level elements such as *tableName*, the table in which the Entity is persisted, *mappedEntityName* and *mappedEntityKeyName*, which identify the entity that uses this Mapping File and its Key and primaryKeyType, which specifies how the primary key should be generated (GUID or Auto-increment).

It also contains a set of **core:property** elements and a set of **core:index** elements. Each *core:property* element of the Mapping File contains a set of sub-elements, which relate an Entity property to a Table column (*propertyName* and *columnName*) and other sub-elements specifying characteristics of the mapping relationship including the data type (*columnType*) and *length* of table columns. Flag elements identify the primary key, business key and XML columns or identify table columns that support other builtin features of the Enactor framework. Each *core:index* element identifies an index applied to a table column and the nature of the index. 

The Mapping File provides the developer a central point of control for individual customisation of how each Entity is persisted to the database or how Enactor builtin functionality will be applied to the Entity.
## Enactor-ORM in the Persistence Layer

As described above, Entity Server selection by the Persistence Layer is independent of the application, which need only supply an Entity or its Key to to perform persistence functions. If the Entity Server applies persistence in a database and applies Enactor-ORM a Mapping File is used and JAXB may also be applied as part of persistence operations. A general outline of processing of each of the Persistence operations using Enactor-ORM is illustrated on the following page.


### **Persistence Operations with Enactor Entities**


|![Diagram Description automatically generated](./Images/Aspose.Words.b59689d8-c423-4987-a9d6-e7cb9d4fc7b2.003.png)|![Diagram Description automatically generated](./Images/Aspose.Words.b59689d8-c423-4987-a9d6-e7cb9d4fc7b2.004.png)|

|![Diagram Description automatically generated](./Images/Aspose.Words.b59689d8-c423-4987-a9d6-e7cb9d4fc7b2.005.png)

![Diagram Description automatically generated](./Images/Aspose.Words.b59689d8-c423-4987-a9d6-e7cb9d4fc7b2.006.png)|

## Extensions of the Enactor-ORM Implementation

To summarise the discussion so far; in meeting the requirements discussed above Enactor Entities and their associated Key and Server classes exhibit the following characteristics:

- Entities exist in Enactor as Java Classes, their attributes as properties, or as XML
- All or any attributes of an entity (as specified in Java JAXB annotations) may be persisted in the database as XML in a single XML column of a table 
- If so, the table has a unique, auto incremented or GUID database key
- The table may also have a unique business key, which may be a composite key
- Attributes of an entity that are used for searching and/or filtering are stored as individual columns (maintained with the XML on INSERT or UPDATE); columns frequently accessed for searching may be indexed
- Entity classes that are persisted are associated with a Key and Server class, which are associated with the Entity itself for persistence-related functionality.

Not all entity classes are persisted. Often, classes are defined as Entities to take advantage of features other than persistence such as interoperability and serialisability. For Entities that are persisted, the associated Key and Server classes encapsulate the nature of persistence of entities away from the application. While Enactor provides a flexible Enactor-ORM implementation the mode of Entity persistence is entirely flexible down to the level of individual Entities and indeed, need not be database oriented at all. 

Persistence may be implemented by alternative ORM technologies or using an external service for example using a tokenisation service to ‘persist’ customer card details thereby avoiding the need to meet all the PCI DSS requirements for secure storage. The Key property of the Keyed and persisted CardDetails Entity accommodates a Token as the business key. Its Key class contains the token and password, obtained perhaps from the Customer Entity and the Load method of the Entity Server thereby obtains instantiates a CardDetails Entity from the Web Service rather than from a local database. By this means the persistence of the CardDetails Entity is consistent with that of all other persisted Entities from the application point of view, yet this distinctive implementation of CardDetails persistence is transparent.

The Key property of an Entity can also be incorporated as a property into other entities, serving as a foreign key. **Note** that the Key is itself an Entity, which can be applied to all the methods available to Non-Keyed Entities and can be used to instantiate the Entity from persistence.

For database persisted Entities the task of synchronising the current version of the Entity definition with the corresponding version of the database table is the job of ***The Enactor Schema Manager***, which has the capability to implement broad system upgrades or minor, specific upgrades detected and processed during Application Start-up.


## Types of Entities

Enactor Entities and optionally their Entity Key and Entity Server classes can be created using the Enactor Entity Wizard. The wizard-created classes and Mapping File can be manually edited to custom requirements. After creation by an initial session of the Enactor Entity Wizard and optionally, after customisation of the elements it has created or modified, the wizard can be re-run to apply wizard-assisted modifications and enhancements. If elements of the Entity have been manually customised the wizard facilitates the merger of these changes with those of the wizard.
### **Standard and Dynamic Entities**

Standard Entities in Enactor are those defined as Java Classes. However, Entities may also be soft defined with their properties defined in files, which are in XML format themselves. These are referred to as Dynamic Entities because they are read by the Runtime Framework and used to create the Entity Class in memory. From the design and development perspective these Entity types differ only in the way they are defined; both types can be created and managed in the same way using the Enactor Entity Wizard. From the Runtime Framework perspective, Dynamic Entities, once instantiated as a Java class, behave, and are used in the same way as Standard Entities. 
### **Keyed Entities**

All Enactor Entities that are persisted contain a **Key** property that is itself a Class, which implements the com.enactor.core.entities.**IEntityKey** interface. The Keyed Entity must also implement the **IKeyedEntity** interface, which delivers the methods, such as *getKey*, that utilise and manage the **Key** property. As described earlier, Keyed entities that are persisted are also associated with an **Entity Server** class, which implements the **IServer** interface, a contract to implement the persistence methods (Load, Save, Delete etc.).

Non-Keyed Entities can be defined and have their purpose, such as messaging and web service calls, but cannot be persisted.


## Entities and XML Namespaces

The XML standard provides for the use of namespaces to guarantee the uniqueness of references when disparate XML objects are used in the same context. The full name of each element includes the namespace, which typically applies a URL to ensure uniqueness of the namespace itself. The builtin elements of Enactor therefore, use a set of namespaces based on the URL of the Enactor website, such as for example:

*http://www.enactor.com/**core*** and [*http://www.enactor.com/**retail***](http://www.enactor.com/retail).

In this scheme the full name of an entity called **User** in the retail namespace is:

`	`[*http://www.enactor.com/**retail**/**User***](http://www.enactor.com/retail/User).

However, as these names are quite long, the XML standard provides for declaration of a ***Prefix*** in the XML header with the syntax xmlns:***Prefix***=”full-namespace”. The prefix is thereby bound to the namespace and will then substitute for the namespace within the human-readable context of the XML definition itself, each name reference being qualified with the prefix delimited by a colon separator (i.e. prefix:name).

For example, XML definitions for Enactor builtin elements in the **core** namespace contain a prefix declaration in the XML header and use it in the body of the definition as follows:

``` xml title="Entity Title"

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>

<core:entityMapping    *xmlns*:core="http://www.enactor.com/core">

`    `<core:property>

`        `<core:columnName>ID</core:columnName>

`        `<core:propertyName>id</core:propertyName>

`        `<core:columnType>STRING</core:columnType>

`        `<core:persistenceType>0</core:persistenceType>

`        `<core:isPrimaryKey>true</core:isPrimaryKey>

`        `<core:length>44</core:length>

`    `</core:property>

`   `etc…

```

![](./Images/Aspose.Words.b59689d8-c423-4987-a9d6-e7cb9d4fc7b2.007.png)

**Note** that the above example is an XML definition of an entity *mapping*, which is used by the Runtime Framework to map class properties to database columns when the entity is persisted. The XML definition is stored, marshalled to a Class and applied at runtime. 


