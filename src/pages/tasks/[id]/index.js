import { deleteTask, getTask } from "@/requests/task"
import { useRouter } from "next/router"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { Button, Grid, Header, Icon, Modal } from "semantic-ui-react"
import Error from "next/error"

export default function TaksDetail({ task, error }) {
  const { query: { id }, push } = useRouter()

  const [confirm, setConfirm] = useState(false)
  const [isDeleting, setisDeleting] = useState(false)

  if (error && error.statusCode) return <Error statusCode={error.statusCode} title={error.statusText} />

  const open = () => setConfirm(true)
  const close = () => setConfirm(false)

  const handDelete = async () => {
    setisDeleting(true)
    toast.promise(deleteTask(id), {
      loading: "Eliminando",
      success: () => {
        setisDeleting(false)
        return "Eliminado"
      },
      error: "Error al eliminar"
    })
    close()
    push("/tasks")
  }

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={1}
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <div>
            <Modal
              dimmer="blurring"
              basic
              open={confirm}
              size='small'
              trigger={
                <Button animated="vertical" circular color='red' onClick={open} loading={isDeleting}>
                  <Button.Content visible>Eliminar</Button.Content>
                  <Button.Content hidden>
                    <Icon name="trash"></Icon>
                  </Button.Content>
                </Button>
              }
            >
              <Header icon>
                <Icon name='trash alternate outline' />
                Eliminar tarea
              </Header>
              <Modal.Actions>
                <Button basic circular color='red' inverted onClick={close}>
                  <Icon name='remove' /> No
                </Button>
                <Button circular color='green' inverted onClick={handDelete}>
                  <Icon name='checkmark' /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export const getServerSideProps = async ({ query: { id } }) => {
  const task = await getTask(id)
  return {
    props: {
      task
    }
  }
}