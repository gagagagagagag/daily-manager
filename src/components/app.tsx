import { useEffect } from 'react'
import { registerSidebarTool } from '@whiteboards-io/plugins'

import icon from '/icon.svg'
import { Sidebar } from './sidebar'

const PLUGIN_NAME = 'Daily Manager'

export const App = () => {
  if (window.location.search === '?sidebar') {
    return <Sidebar />
  } else if (window.location.search === '') {
    return <PluginRoot />
  }

  return null
}

const PluginRoot = () => {
  useEffect(() => {
    const baseUrl =
      window.location.origin + window.location.pathname.replace(/^\/$/, '')
    registerSidebarTool({
      id: PLUGIN_NAME,
      icon: baseUrl + icon,
      tooltip: 'Daily Manager',
      contentUrl: baseUrl + '?sidebar',
    })
  }, [])

  return null
}
