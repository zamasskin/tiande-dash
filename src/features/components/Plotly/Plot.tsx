import dynamic from 'next/dynamic'
import * as csDictionary from 'plotly.js/lib/locales/ru.js';

interface PlotProperty {
  data?: any, 
  layout?: any, 
  style?: any, 
  config?:any,
  onRelayout?: any,
  onInitialized?: any
}

function Plot(properties: PlotProperty) {
  const config = {
    ...(properties.config || {}),
    locales: { 'ru': csDictionary },
    locale: 'ru'
  } 
  const DynamicComponentWithNoSSR = dynamic<PlotProperty>(import('react-plotly.js'), {
    ssr: false
  })
  return (
    <DynamicComponentWithNoSSR {...properties} config={config} />
  )
}

export default Plot