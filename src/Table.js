import React from 'react'
import Highlight from 'react-highlight-words';

const Table = ({
  filteredSenders,
  categories,
  filters,
  onSenderChange
}) => {
  return (
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
                data-sender={sender.sender}
                type="checkbox"
                name="organize"
                onChange={onSenderChange}
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
                  data-sender={sender.sender}
                  name="folder"
                  className="filters__folder"
                  onChange={onSenderChange}
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
  )
}

export default Table