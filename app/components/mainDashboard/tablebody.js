import React from 'react';
import TableItem from './tableitem.js'

export default class TableBody extends React.Component {

  render() {
    return (
      <tbody>
        {this.props.currentPlaylist.playlistItems.map((playlistItem, i) => {
          return (
            <TableItem key={i} playlistItem={playlistItem} />
          )
        })}
      </tbody>
    );
  }
}
