import axios from "axios";
import { Component } from "react"
import { SaciChart } from "./SaciChart";

export class RTChart extends Component {
    async dataFetching() {
        let data_bar = []
        try {
            const { data } = axios.get(`/api/saci/logs/${this.props.id}/realtime`)
            const final = data.map(({ id, value, date }) => {
                return {
                    date: date.split(' ')[1],
                    value: value,
                    id: id
                }
            })
            data_bar = final
        } catch (error) {
            console.log(error)
        }
        return data_bar
    }

    constructor(props) {
        super(props)
        this.state = {
            interval: props.interval || 1000,
            data: this.dataFetching(),
            id: props.id
        }
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.tick()
        }, this.props.interval || 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    async tick() {
        this.setState({
            data: await this.dataFetching()
        })
    }

    render() {
        return (
            <SaciChart dataKeyY={'value'} dataKeyX={'date'} data={this.state.data} />
        )
    }
}