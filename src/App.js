import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { parseQueryString } from './utils/qs';
import filterHelper from './utils/filterHelper';
import filterFolder from './utils/filterFolder';
import filterText from './utils/filterText';
import normalizer from './utils/normalizer';
import values from './utils/values';
import mockData from './mock_rp_data.json';
import './App.css';

import Header from './Header'
import Filters from './Filters'
import Table from './Table'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senders: normalizer(mockData, 'sender'),
      categories: [...mockData.reduce((set, item) => set.has(item.folder) ? set : set.add(item.folder), new Set())],
    };
  }

  onFilterFolderChange = (e) => {
    this.props.history.push(filterHelper({
      queryString: this.props.location.search,
      filterField: 'folder',
      targetValue: e.target.value
    }))
  };

  onFilterTextSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(filterHelper({
      queryString: this.props.location.search,
      filterField: 'q',
      targetValue: e.target.filters__text.value
    }));
  }

  onSenderChange = (e) => {
    const { name, type, checked, value, attributes } = e.target;
    const id = attributes.getNamedItem('data-sender').value
    const { senders } = this.state;
    const updatedSender = {
      [id]: {
        ...senders[id],
        [name]: type === 'checkbox' ? checked : value
      }
    };
    this.setState({ senders: { ...senders, ...updatedSender } });
  }

  render() {
    const { senders, categories } = this.state;
    const filters = parseQueryString(this.props.location.search);
    const filteredSenders = values(senders)
                            .filter(sender =>
                              filterFolder(filters.folder, sender) &&
                              filterText(filters.q, sender, ['sender', 'domain', 'email']))
                            .sort((a, b) => (filters.reverse ? JSON.parse(filters.reverse) : false) ?
                              b[filters.sortBy || 'sender'].toString().localeCompare(a[filters.sortBy || 'sender']) :
                              a[filters.sortBy || 'sender'].toString().localeCompare(b[filters.sortBy || 'sender'])
                            );

    return (
      <article className="App">
        <Header />
        <section>
          <Filters 
            filters={filters}
            categories={categories}
            onFilterFolderChange={this.onFilterFolderChange} 
            onFilterTextSubmit={this.onFilterTextSubmit}
          />
          <Table 
            filteredSenders={filteredSenders}
            categories={categories}
            filters={filters}
            onSenderChange={this.onSenderChange.bind(this)}
          />
        </section>
      </article>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(App);
