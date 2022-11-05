const { ChartJSNodeCanvas } = require('chartjs-node-canvas')
const {
  charts: {
    options: { size, colors, font },
  },
} = require('../../configs')

const canvasRenderService = new ChartJSNodeCanvas(size)

const cunstomBackground = {
  id: 'custom_canvas_background_color',
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d')
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, chart.width, chart.height)
    ctx.restore()
  },
}

const createImage = async ({ labels, datasets, scales }) => {
  const configuration = {
    type: 'line',
    data: {
      labels,
      datasets,
    },
    options: {
      layout: {
        padding: 20,
      },
      elements: {
        point: {
          radius: 3.5,
        },
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: colors.line,
            font,
          },
        },
      },
      scales: {
        y: {
          suggestedMin: scales.min,
          suggestedMax: scales.max,
          ticks: {
            color: colors.text,
            font,
            stepSize: 0.1,
          },
          grid: {
            color: colors.grid,
          },
        },
        x: {
          ticks: {
            color: colors.text,
            font,
          },
          grid: {
            color: colors.grid,
          },
        },
      },
    },
    plugins: [cunstomBackground],
  }

  const dataUrl = await canvasRenderService.renderToDataURL(configuration)
  return dataUrl
}

module.exports = {
  createImage,
}
