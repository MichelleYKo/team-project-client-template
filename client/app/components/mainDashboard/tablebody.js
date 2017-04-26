import React from 'react';
import TableItem from './tableitem.js'

export default class TableBody extends React.Component {
  constructor(props) {
    super(props)
    this.filterAgainstTerm = this.filterAgainstTerm.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      activeIndex: null
    }
  }

  handleClick(index) {
    this.setState({activeIndex: index})
  }

  filterAgainstTerm(val) {
    //precondition: val is a song json object with title, album and artist
    var term = String(this.props.filterTerm).toLowerCase();
    console.log(val);
    var title = String(val.title).toLowerCase();
    var album =   String(val.album).toLowerCase();
    var artist = String(val.artists[0]).toLowerCase();

    return (term == " " || title.includes(term) || album.includes(term) || artist.includes(term));
  }

  render() {
    return (
      <tbody>
        {this.props.currentPlaylist.playlistItems.filter(this.filterAgainstTerm).map((playlistItem, i) => {
          return (
            <TableItem key={i} id = {i} playlistItem={playlistItem} handleSelectSong={this.props.handleSelectSong} handleSelectItem={this.handleClick} isActive={i == this.state.activeIndex}/>
          )
        })}
      </tbody>
    );
  }
}
