import React from 'react'
import { ComponentTreeWidget } from '@designable/react'
// import { observer } from '@formily/reactive-react'
// import { Card } from './Card'
// import 'antd/dist/antd.css'
// import '../formily.antd.umd.production.css'
// import './Module/style.css'
import {
  Input,
  Form,
  Select,
  TreeSelect,
  Cascader,
  Radio,
  Checkbox,
  Slider,
  Rate,
  NumberPicker,
  Transfer,
  Password,
  DatePicker,
  TimePicker,
  Upload,
  Switch,
  Text,
  Card,
  ArrayCards,
  ObjectContainer,
  ArrayTable,
  Space,
  FormTab,
  Field,
  FormCollapse,
  FormLayout,
  FormGrid,
} from '@designable/formily-antd'
import { Module, ModuleRef } from './Module'

export const Content = () => (
  <ComponentTreeWidget
    components={{
      Module,
      ModuleRef,
      Input,
      Select,
      TreeSelect,
      Cascader,
      Radio,
      Checkbox,
      Slider,
      Rate,
      NumberPicker,
      Transfer,
      Password,
      DatePicker,
      TimePicker,
      Upload,
      Switch,
      Text,
      Field,
      Form,
      Card,
      ArrayCards,
      ObjectContainer,
      ArrayTable,
      Space,
      FormTab,
      FormCollapse,
      FormLayout,
      FormGrid,
      // Field: observer((props) => {
      //   const node = useTreeNode()
      //   return (
      //     <span
      //       {...props}
      //       style={{
      //         background: '#eee',
      //         display: 'inline-block',
      //         ...props.style,
      //         padding: '10px 20px',
      //         border: '1px solid #ddd',
      //       }}
      //     >
      //       <span data-content-editable="title">{node.props.title}</span>
      //       {props.children}
      //     </span>
      //   )
      // }),
      // Card,
      // Card: (props) => {
      //   return (
      //     <div
      //       {...props}
      //       style={{
      //         background: '#eee',
      //         border: '1px solid #ddd',
      //         display: 'flex',
      //         padding: 10,
      //         height: props.children ? 'auto' : 150,
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //       }}
      //     >
      //       {props.children ? props.children : <span>拖拽字段进入该区域</span>}
      //     </div>
      //   )
      // },
    }}
  />
)
