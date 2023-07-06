import { useRouter } from "next/router"
import { Button, Grid, Header } from "semantic-ui-react"

export const NoData = () => {
    return (
        <Grid centered verticalAlign="middle" columns={1}>
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <Header size="small">Sin datos existentes</Header>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
