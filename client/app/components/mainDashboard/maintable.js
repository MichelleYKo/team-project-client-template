import React from 'react';
import TableBody from './tablebody'
import TableHead from './tablehead'


export default class MainTable extends React.Component {
  constructor(props) {

    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.clearFilterField = this.clearFilterField.bind(this);
    // The FeedItem's initial state is what the Feed passed to us.
    this.state = {
      filterTerm: ""
    }
  }

  handleFilterChange(e) {
    // Prevent the event from "bubbling" up the DOM tree.
    e.preventDefault();
    // e.target is the React Virtual DOM target of the input event -- the
    // <textarea> element. The textarea's `value` is the entire contents of
    // what the user has typed in so far.
    this.setState({filterTerm: e.target.value});

  }

  handleFilter(clickEvent) {
    clickEvent.preventDefault();

    var filter = this.state.filterTerm.trim();
    // var email = this.state.tempEmail.trim();
    if(filter !== "" && clickEvent.button == 0){
      //re-render tablebody
    }
  }

  clearFilterField(clickEvent){
    clickEvent.preventDefault();
    this.setState({filterTerm: ""})
  }

  render() {
    return (
        <div id="mainPanel" className="main-page col-md-10 col-md-offset-2" style={{height:999}} >
          <div className = "container-fluid">
            <table className="table table-hover table-borderless">
              <TableHead currentPlaylist={this.props.currentPlaylist} filterTerm = {this.state.filterTerm} handleFilterChange = {this.handleFilterChange} handleFilter = {this.handleFilter} clearFilterField = {this.clearFilterField}/>
              <TableBody currentPlaylist={this.props.currentPlaylist} filterTerm = {this.state.filterTerm} handleSelectSong = {this.props.handleSelectSong} />
            </table>
          </div>
        </div>
    )
  }
}
