# Process Flow

The **Process Flow** element is used to represented Process Flow in the Process Design Editor and is always a link between a pair of State and/or Action Elements. The begin-point of a Process Flow is always an explicit Event or Outcome and the endpoint is always another State or Action. Each ***Process Flow*** represents a distinct transfer of execution control, from a State to an Action, an Action to another Action or an Action back to the same or another State. In a final Process Design Definition all *States* and *Actions* are linked by a *Process Flow* to at least one other *State* or *Action*.

The Process Flow is defined by Links, which are available in the Palette among the set of Modes. Links are created using the Link entry of the Palette (see ***Cursor Mode*** section above). When the Link Mode is selected a sequence of mode changes is initiated; the first change of the Cursor indicates that a mouse-click-and-hold operation is expected to select an *Outcome* or *Event* within an Icon of an Action or State (otherwise the mode reverts). Once a selection is made a new mode is entered as the Link appears with the Cursor at the arrow-point end, which now indicates that the mouse button release should select another Action or State as the target of the ***Process Flow***. If so, a Process Flow is created, otherwise the link mode reverts without creating a Process Flow. An existing Process Flow Link may be given focus by a single mouse-click and either deleted using the DELETE key or moved using a mouse-click-and drag operation applied to one of the handles at either end of the link. Depending on which end handle is selected the cursor must drag the handle to an Outcome/Event or a target Action/State as above. For correct integration of an Action into the Process Flow, at least one Link must have the Action as its target and all of the possible Outcomes exposed in the Action Icon must be either mapped to a Target (Action or State) or ticked in the ***Unused*** Checkbox.

## Adding Conditional Process Flow Elements

Process Flows may also be **conditional**. Multiple Process Flow Links may be specified to emanate from the same State Event or Action Outcome. One of the links must always be Unconditional, all other links *must* be conditional. The ***Condition*** of a conditional *Process Flow* link is a property of the Link and is defined in Expression Language.

When a second or subsequent Process Flows link is applied to an Event or Outcome the flow lines are all shown in red, indicating that they are invalid, until one or more conditions are specified. To apply a condition to a Process Flow double-mouse-click on the flow line to open the ***Edit Condition*** window. This is the **Enactor Tools Expression Builder**, which is an aid to specifying a condition in Expression Language (EL). The editor provides access to applicable State Data elements and their properties and to a list of builtin Expression Language functions, from which elements may be selected (by double-mouse-click) and possibly in conjunction with manually keyed text to build the condition expression.

Any of these Expression elements may be used directly as elements of the expression or as arguments to functions used in the expression (double-mouse-click to select the argument and then double-mouse-click on the drop-down list element to replace the argument). The process with the *Expression Builder* in the *Edit Condition* dialogue is illustrated below:

![](./Images/Aspose.Words.2c3861de-e91d-47b8-a029-a6e4491dc2ee.001.png)

The Expression Language (EL) and Expression Builder are discussed in more depth in the next Chapter. The main point here is the facility for conditionality on Process Flow.

Typically, conditions applied to flow lines are complementary involving the same properties (for example, as is the case for the flow lines from the *SayHello* event in the Main Prompt State apply the conditions *empty(state.name)* and *notEmpty(state.name)*). If no condition is true, then no flow will apply, and an exception will be raised by the runtime or just ignored.

|![](./Images/Aspose.Words.2c3861de-e91d-47b8-a029-a6e4491dc2ee.002.png)|<p>Process Flow</p><p>The Process Flow element is shown as an arrow indicating the direction of flow and colour coded according to function or circumstance, as discussed later.</p>|
| :- | :- |

Events, Outcomes and *Process Flow* links are used by the Runtime Framework to execute the Process.

## Conditional Process Rules

At least one of the emerging Process Flows must be unconditional; this is up to the Designer and is not checked at Design time. All other Process Flows must be conditional; the Process Design Editor signals an error if more than one Unconditional Process Flow is present. The Process Design Editor also applies error checking to the EL expressions within the designer at Design time.

At runtime the Runtime Framework evaluates the EL conditions, applied in no specific order; whichever condition is found true first is applied. The expressions of all Conditional Process Flows are always evaluated first, until and if one is found to be true before taking the Unconditional Process Flow if and only if none of the conditions are met. If no Unconditional Process Flow exists (which is not checked by the Process Design Editor at Design time) an exception occurs.


