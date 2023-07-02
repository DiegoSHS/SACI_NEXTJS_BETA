import { Container, Grid } from 'semantic-ui-react'
import Notify from './Notify'
import { NavMenu } from './Menu'

export const SideNavBar = ({ children }) => {
    return (
        <Grid columns={1}>
            <Notify />
            <NavMenu />
            <Container fluid style={{ marginTop: "5vh" }} >
                <Grid container stretched inverted centered columns={1}>
                    <Grid.Column textAlign="center" verticalAlign='middle'>
                        {children}
                    </Grid.Column>
                </Grid>
            </Container>
        </Grid>
    )
}

export default SideNavBar