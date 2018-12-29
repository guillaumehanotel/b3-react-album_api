import React, {Component} from 'react'
import {Image, Modal} from 'semantic-ui-react'

class PhotoModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url: this.props.url
    }
  }

  render() {
    return (
      <Modal
        open={true}
        onClose={this.props.handleCloseModal}
        closeIcon={true}>
        <Modal.Content image>
          <Image wrapped size='medium' src={this.state.url}/>
        </Modal.Content>
      </Modal>
    )
  }

}

export default PhotoModal