---
sidebar_position: 3
id: looping-state
displayed_sidebar: toolkitSidebar
---


# Looping and Iteration States
## Looping State 

One of the easiest ways to introduce a loop into an application process is to use a LoopingState. This is a type of state that will execute actions repeatedly until till either a count is reached or the Completed flag variable is set.

To use a looping state drag a Looping State symbol from the States section of the Palette and connect up. The Execute event runs each time around the loop decrementing LoopCount until it reaches zero. You can set up LoopCount to an initial value by passing in a value from an action, using an Assign, using EL (Expression language) or, for a fixed loop, by using an input parameter. 

You can get to the parameters dialog either by using the Parameters property field on the Properties pane or by holding down the shift key and double-clicking the Inputs label on the symbol. In the example below we are specifying a fixed loop count of 5:

<img
  src={require('./Images/loops-1.png').default}
  alt="Loops-1"
/>

Connect up the actions that you want to run. In the example below we log the count each time around the loop:

<img
  src={require('./Images/loops-2.png').default}
  alt="Loops-2"
/>

Running the example above executes the log message action 5 times which can be seen in the console.

Note that the loop count is simply output by defining the variable loopCount as substitution parameter in the LogMessage parameter of UILogMessageAction and by defining LoopCount as an additional input to the log action. The message string used is shown below:

<img
  src={require('./Images/loops-3.png').default}
  alt="Loops-3"
/>

## Iterator States

An iterator state is something that executes a link for each item in a list. Lists are produced by a variety of types of actions in the Enactor system. For example many database actions produce lists of data. The IteratorState can take as input any Java class that is of type java.util.Iterator or java.lang.Iterable.

In the example below a list is actually being produced by an action called UIExecuteJavaScriptAction that executes some java script that adds some items to a java List (which implements Iterable). Notice that a variable enactor.coreUI.Iterable is declared as a process state variable and the List output of the CreateList action is mapped to this variable.

<img
  src={require('./Images/loops-4.png').default}
  alt="Loops-4"
/>

Running the process iterates over the list and for each item runs the UILogMessageAction. The item description is output using little bit of EL in the log message parameter passed to the log action:

<img
  src={require('./Images/loops-5.png').default}
  alt="Loops-5"
/>

## When do Looping and Iterator State start counting and iterating?

Looping and iterator states start counting and iterating when they are “entered”. A state is entered on an incoming link from a different state. If there are actions in-between one state and another then it is the final link into the state that is the “entering” link. When this happens the state that was active is left before the new state is entered. In this way actions always execute in the context of a state.

If a link comes out of a state, runs one or more actions, and then returns to the same state then that state is not entered on the way back in because it was never left. This behavior is used by the looping and iterator states. The count/list is set to the beginning when they are entered from a different state and they rely on the Execute event only containing actions – otherwise the count/list will be reset on the way back.

What if you need to have states while looping and iterating? This can be solved by putting the required states in a sub-process. Then, as far as the looping process, is concerned the looping state has not been left. 

## Iterating and counting with Actions

It is also possible to iterate and count using actions. Counting and testing a count variable can be done simply with count variables using the Assign action and using EL as test conditions. Iteration can be performed using the IterateAction.

The example below shows the same CreateList action but with rather than use an iterator state it first uses the GetIteratorAction to convert the list to an iterator and then uses the IterateAction in order to step through each item.

<img
  src={require('./Images/loops-6.png').default}
  alt="Loops-6"
/>

The IterateAction simply returns the outcome Next for each item, with the value in the variable enactor.coreUI.IteratorItem. At the end of the list it returns with Completed.

##Counting with a Process or State variable

It is very simple to count in a loop using as Assign action to set a count variable and then use an EL expression to test a count. For example the following process loops 10 times calling the Action ExecuteAction.

<img
  src={require('./Images/loops-7.png').default}
  alt="Loops-7"
/>

The Assign initialises the variable Count and increments it by 1 if it already exists:

<img
  src={require('./Images/loops-8.png').default}
  alt="Loops-8"
/>

The expression on the Success Outcome link of the Assign action exits the loop if the count is equal to or greater than 10:

<img
  src={require('./Images/loops-9.png').default}
  alt="Loops-9"
/>

## Counting and iterating with custom actions

From the above examples you can easily see how a custom action that you code yourself can iterate and count using variables that it outputs and stores at either state or process level and using Outcomes such as Next or Complete to control flow within the process.
