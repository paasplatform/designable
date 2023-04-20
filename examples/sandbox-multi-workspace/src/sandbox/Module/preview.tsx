import React, { Fragment, useMemo } from 'react'
import { createBehavior } from '@designable/core'
import { createForm } from '@formily/core'
import { observer } from '@formily/react'
import { usePrefix, DnFC } from '@designable/react'
// import { AllSchemas } from '@designable/formily-antd'
import {
  Module as InternalModule,
  ModuleRef as InternalModuleRef,
} from '@paasplatform/infras'
import { Module as ModuleLocales } from './Locales'

export const Module: DnFC<React.ComponentProps<typeof InternalModule>> =
  observer((props) => {
    const prefix = usePrefix('designable-form')
    const form = useMemo(
      () =>
        createForm({
          designable: true,
        }),
      []
    )
    return (
      <InternalModule
        {...props}
        component={Fragment}
        style={{ ...props.style }}
        className={prefix}
        form={form}
      >
        {props.children}
      </InternalModule>
    )
  })

Module.Behavior = createBehavior({
  name: 'Module',
  selector: (node) => node.componentName === 'Module',
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      // propsSchema: {
      //   type: 'object',
      //   properties: {
      //     // ...(AllSchemas.FormLayout.properties as any),
      //     style: AllSchemas.CSSStyle,
      //   },
      // },
      // defaultProps: {
      //   labelCol: 6,
      //   wrapperCol: 12,
      // },
    }
  },
  designerLocales: ModuleLocales,
})

// Module.Resource = createResource({
//   title: { 'zh-CN': '模块', 'en-US': 'Module' },
//   icon: 'FormLayoutSource',
//   elements: [
//     {
//       componentName: 'Field',
//       props: {
//         type: 'object',
//         'x-component': 'Module',
//       },
//     },
//   ],
// })

export const ModuleRef: DnFC<React.ComponentProps<typeof InternalModuleRef>> =
  observer((props) => {
    return <InternalModuleRef {...props}></InternalModuleRef>
  })

ModuleRef.Behavior = createBehavior({
  name: 'ModuleRef',
  selector: (node) => node.componentName === 'ModuleRef',
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      // propsSchema: {
      //   type: 'object',
      //   properties: {
      //     // ...(AllSchemas.FormLayout.properties as any),
      //     style: AllSchemas.CSSStyle,
      //   },
      // },
      // defaultProps: {
      //   labelCol: 6,
      //   wrapperCol: 12,
      // },
    }
  },
  designerLocales: ModuleLocales,
})
