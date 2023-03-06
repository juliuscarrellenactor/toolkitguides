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
    label: 'Getting Starting',
    collapsible: true,
    collapsed: false,
    items: [
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
        items: ['Application Processes/Basics/About Application Processes', 'Application Processes/Basics/States','Application Processes/Basics/ Create, Call and Deploy Application Processes']
      },
      {
        type: 'category',
        label: 'Actions',
        items: ['Application Processes/Basics/Actions'],
      }, 
      {
        type: 'category',
        label: 'Exceptions',
        items: ['Application Processes/Exceptions/How to Handle Exceptions in Processes'],
      }, 
      {
        type: 'category',
        label: 'Database',
        items: ['Application Processes/Entitites & Persistence/Loading and Saving Entities', 'Application Processes/Entitites & Persistence/Managing Database Transactions']
      }
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
        items: ['Application Processes/Basics/States'],
      },
      {
        type: 'category',
        label: 'Actions',
        items: ['Application Processes/Basics/States'],
      },
    ],
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


] 


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

};

module.exports = sidebars;
