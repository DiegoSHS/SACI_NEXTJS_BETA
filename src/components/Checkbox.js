import { Checkbox, Form } from "semantic-ui-react"

export const GenerateCheckBox = ({data, stateFn}) => {
    const checked = (e, data ) => stateFn(data.value)
    if (data === undefined || data.length === 0) {
        return (
            <p>sin sensores</p>
        )
    }
    return (
        <Form widths="equal">
            <Form.Field inline>
                {
                    data.map((radio, i) => (
                        <Checkbox
                            radio
                            label={`Sensor ${i+1}`}
                            name={`Sensor ${i+1}`}
                            value={i}
                            checked={sensor === i}
                            onChange={checked}
                        />
                    ))
                }
            </Form.Field>
        </Form>
    )
}