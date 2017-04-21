import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import Highlight from 'react-highlight-words';
import { parseQueryString } from './utils/qs';
import filterHelper from './utils/filterHelper';
import filterFolder from './utils/filterFolder';
import filterText from './utils/filterText';
import normalizer from './utils/normalizer';
import values from './utils/values';
import mockData from './mock_rp_data.json';
import './App.css';


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

  onSenderChange = (id, e) => {
    const { name, type, checked, value } = e.target;
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
        <header>
          <h2 className="page-title">Your Email Organized</h2>
          <h4>You can recategorize your senders or leave them in your Inbox by unchecking the box next to the sender&#39;s name.</h4>
        </header>
        <section>
          <div className="filters">
            <select
              className="filters__folder"
              onChange={this.onFilterFolderChange}
              value={filters.folder}>
                <option value="All">Show All</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <form
              className="filters__text"
              onSubmit={this.onFilterTextSubmit}>
                <input
                  className="filters__text__input"
                  name="filters__text"
                  type="text"
                  defaultValue={filters.q}
                  placeholder="Search for a sender..."/>
            </form>
          </div>
          <main>
            <table className="table">
              <thead>
                <tr>
                  <th className="table__organize">Organize</th>
                  <th>Sender</th>
                  <th>Domain</th>
                  <th>Email</th>
                  <th>Folder</th>
                </tr>
              </thead>
              <tbody>
                {filteredSenders.map((sender, key) => (
                  <tr
                    key={key}
                    className={sender.organize ? 'table__checked' : 'table__unchecked'}>
                    <td className="table__organize">
                      <input
                        type="checkbox"
                        name="organize"
                        onChange={this.onSenderChange.bind(this, sender.sender)}
                        checked={sender.organize} />
                      </td>
                    <td>
                      <Highlight
                        highlightClassName='highlight'
                        searchWords={[filters.q]}
                        textToHighlight={sender.sender} />
                    </td>
                    <td>
                      <Highlight
                        highlightClassName='highlight'
                        searchWords={[filters.q]}
                        textToHighlight={sender.domain} />
                    </td>
                    <td>
                      <Highlight
                        highlightClassName='highlight'
                        searchWords={[filters.q]}
                        textToHighlight={sender.email} />
                    </td>
                    <td className={sender.folder.replace(/\s/g,'')}>
                      {sender.organize ? (
                        <select
                          name="folder"
                          className="filters__folder"
                          onChange={this.onSenderChange.bind(this, sender.sender)}
                          value={sender.folder}>
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      ) : sender.folder}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
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
