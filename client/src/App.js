import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state={ songs: [] }

  componentDidMount(){
    axios.get('/api/songs')
    .then(res => {
      this.setState({songs: res.data})
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let { newSongArtist, newSongTitle } = this.state
    axios.post('api/songs', {artist: newSongArtist, title: newSongTitle})
    .then( res => {
      this.setState({
        songs: [...this.state.songs, res.data],
        newSongArtist: '',
        newSongTitle: '',
      })
    })
    this.setState({newSongArtist: '', newSongTitle: ''})
  }

  handleDelete = (id) => {
    console.log(id)
    axios.delete(`api/songs/${id}`)
    .then( res => {
      if(res.data.status === 'ok') {
        this.setState({
          songs: this.state.songs.filter(song => song.id !== id)
        })
      }
    })
  }

  render() {
    return (
      <div>
        <h1>This is the top 100 songs.</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.newSongArtist}
            name='newSongArtist'
            onChange={this.handleChange}
            placeholder='Artist'
            required
          />
          <input
            value={this.state.newSongTitle}
            name='newSongTitle'
            onChange={this.handleChange}
            placeholder='Title'
            required
          />
          <button type='submit'>Submit</button>
        </form>
        <ol>
          {this.state.songs.map( song => {
            return(
              <li key={ song.id }>Artist: {song.artist} ///\\\ Title: {song.title}
                <button 
                onClick={() => this.handleDelete(song.id)}
                >X</button>                
              </li>
          )
          })}
        </ol>
      </div>
    );
  }
}

export default App;
