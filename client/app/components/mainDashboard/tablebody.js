import React from 'react';
import TableItem from './tableitem.js'

export default class TableBody extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      activeIndex: null
    }
  }

  handleClick(index) {
    this.setState({activeIndex: index})
  }

  render() {
    return (
      <tbody>
        {this.props.currentPlaylist.playlistItems.map((playlistItem, i) => {
          return (
            <TableItem key={i} id = {i} playlistItem={playlistItem} handleSelectSong={this.props.handleSelectSong} handleSelectItem={this.handleClick} isActive={i == this.state.activeIndex}/>
          )
        })}
      </tbody>
    );
  }
}
