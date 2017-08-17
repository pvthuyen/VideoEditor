import React, { Component } from 'react';

class Item extends Component {
  render() {
    return(
      <div className="item" style={{
        paddingBottom: '4%',
        height: '250px',
        width: 'auto',
        flex: '0 1 30%',
        alignItems: 'stretch',
        
      }}>
        <img 
            style={{
              height: '100%',
              background: '#eee',
              cursor: 'pointer',
              display: 'block',
              margin: '0 auto',
            }} 
            src={'/products/' + this.props.product + '.jpg'}
            onClick={()=>{
              let form = new FormData();
              form.append('file_name', this.props.product + '.jpg');
              fetch('/process_file', {
                  method: 'POST',
                  headers: {
                  },
                  body: form
              })
                  .then(res => res.json())
                  .then(resultList => {
                    this.props.showResult(resultList);
                  });
            }} 
        />
      </div>
    );
  }
}

export default Item;