/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** 
 
@type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */


const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // toolkitsidebar: [{type: 'autogenerated', dirName: '.'}],

  // toolkitSidebar : {
  //   // 'Getting Started': ['about-app-processes'],
  //   // 'Application Processes': ['looping-state'],

  //   'Getting Started': ['Application Processes/Basics/Actions'],
  //   'Application Processes': ['Application Processes/Basics/States'],
  //   'Business Processes': ['Application Processes/Basics/States'],
    

  // },

  toolkitSidebar :  [ 'toolkit',
    {
    type: 'category',
    label: 'Getting Started',
    collapsible: true,
    collapsed: false,
    items: [ 'Application Processes/Getting Started/What is the Enactor Toolkit',
      'Application Processes/Getting Started/How to Install the Enactor Eclipse Plugins', 
    ],
  }, 

  {
    type: 'category',
    label: 'Application Processes',
    collapsible: true,
    collapsed: false,
    items: [
      {
        type: 'category',
        label: 'Basics',
        items: ['Application Processes/Basics/What are Application Processes', 'Application Processes/Basics/The Process Design Editor', 'Application Processes/Basics/About Application Processes',
        'Application Processes/Basics/Process Flow', 'Application Processes/Basics/Creating a New Application Process', 'Application Processes/Basics/Debugging Tools',
        'Application Processes/Basics/ Create, Call and Deploy Application Processes','Application Processes/Basics/Application View' ,'Application Processes/Basics/Variable Scope' , 'Application Processes/Basics/Data Mappings', 'Application Processes/Basics/Properties',
        {type: 'category',
        label: 'Tools',
        items: ['Application Processes/Basics/Tools/The Refactor Tool']
      }] },
      {
        type: 'category',
        label: 'Actions',
        items: ['Application Processes/Actions/Actions', 'Application Processes/Actions/Call Processes'],
      }, 

      {
        type: 'category',
        label: 'States',
        items: ['Application Processes/States/States'],
      }, 
      {
        type: 'category',
        label: 'Exceptions',
        items: ['Application Processes/Exceptions/How to Handle Exceptions in Processes'],
      }, 

      {
        type: 'category',
        label: 'Entities & Persistence',
        items: ['Application Processes/Entitites & Persistence/Entities', 'Application Processes/Entitites & Persistence/Creating Entity Definitions', 'Application Processes/Entitites & Persistence/Entity Related Library Actions','Application Processes/Entitites & Persistence/Entity Relationships and Persistence', {
          type: 'category',
          label: 'Database',
          items: ['Application Processes/Entitites & Persistence/Managing Database Transactions', 'Application Processes/Entitites & Persistence/Loading and Saving Entities', 'Application Processes/Entitites & Persistence/Persistence of Enactor Entities']
        },
  ]
      },

      {
        type: 'category',
        label: 'Application Hooks',
        items: ['Application Processes/Application Hooks/Application Hooks'],
      }, 
    
    ],
  },
  {
    type: 'category',
    label: 'POS Development',
    collapsible: true,
    collapsed: false,
    items: [
      {
        type: 'category',
        label: 'Fundamentals',
        items: ['POS Development/Fundamentals/Message Resources'],
      },
      {
        type: 'category',
        label: 'Background Services',
        items: ['POS Development/Background Services/Background Services'], 
      },
      
    ],
  },
  {
    type: 'category',
    label: 'Business Processes',
    collapsible: true,
    collapsed: false,
    items: [
      {
        type: 'category',
        label: 'Basics',
        items: ['Application Processes/States/States'],
      },
      {
        type: 'category',
        label: 'Actions',
        items: ['Application Processes/States/States'],
      },
    ],
  },

  {
    type: 'category',
    label: 'Resource Library',
    collapsible: true,
    collapsed: false,
    items: [
      'Application Processes/Resource Library/Resource Library'],
  }
  
] ,



reactSidebar :  [ {
  type: 'category',
  label: 'Getting Starting',
  collapsible: true,
  collapsed: true,
  items: [
    'react'
  ],
},
{
  type: 'category',
  label: 'React Development',
  collapsible: true,
  collapsed: true,
  items: [
    {
      type: 'category',
      label: 'Basics',
      items: ['React UI/React Development/React Fundamentals'], 
    },
  ],
}


]  }


  // apiSidebar: [', 'doc4'],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */



module.exports = sidebars;
