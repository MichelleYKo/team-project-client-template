import React from 'react';
import TableItem from './tableitem.js'

export default class TableBody extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentPlaylistItems: []
    };
  }

  componentWillMount() {
    this.setState({currentPlaylistItems: this.props.currentPlaylist});
  }

  render() {
    return (
      <tbody>
        <TableItem />
        <TableItem />
        <TableItem />
        <TableItem />
        <TableItem />
        <TableItem />
      </tbody>
    )
  }
}
