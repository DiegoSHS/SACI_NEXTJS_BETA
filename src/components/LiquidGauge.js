import { color } from "d3-color"
import { interpolateRgb } from "d3-interpolate"
import LiquidFillGauge from "react-liquid-gauge"

export const LiquidGauge = ({ radius, textSize, value }) => {
    value = (value < 100 && value > 0) ? value : 100
    const width = radius * 2,
        height = width,
        startColor = '#6ad9eb',
        endColor = '#2185d0',
        interpolate = interpolateRgb(startColor, endColor),
        fillColor = interpolate(value / 100),
        gradientStops = [
            {
                key: '0%',
                stopColor: color(fillColor).darker(0.5).toString(),
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: fillColor,
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: color(fillColor).brighter(0.5).toString(),
                stopOpacity: 0.5,
                offset: '100%'
            }
        ]
    return (
        <LiquidFillGauge
            style={{ margin: '0 auto' }}
            width={width}
            height={height}
            value={value}
            percent="%"
            textSize={textSize}
            textOffsetX={0}
            textOffsetY={0}
            textRenderer={() => {
                const radius = Math.min(height / 2, width / 2),
                    textPixels = (textSize * radius / 2),
                    valueStyle = { fontSize: textPixels },
                    percentStyle = { fontSize: textPixels * 0.6 }
                return (
                    <tspan>
                        <tspan className="value" style={valueStyle}>{value}</tspan>
                        <tspan style={percentStyle}>{'%'}</tspan>
                    </tspan>
                )
            }}
            riseAnimation
            waveAnimation
            waveFrequency={2}
            waveAmplitude={1}
            gradient
            gradientStops={gradientStops}
            circleStyle={{
                fill: fillColor
            }}
            waveStyle={{
                fill: fillColor
            }}
            textStyle={{
                fill: color('#444').toString(),
                fontFamily: 'Arial'
            }}
            waveTextStyle={{
                fill: color('#fff').toString(),
                fontFamily: 'Arial'
            }}
        />
    )
}