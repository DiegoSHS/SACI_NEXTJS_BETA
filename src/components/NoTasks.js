import { useRouter } from "next/router"
import { Button, Grid } from "semantic-ui-react"

export const NoData = () => {
    return (
        <Grid centered verticalAlign="middle" columns={1}>
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <h1>Sin datos existentes</h1>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
