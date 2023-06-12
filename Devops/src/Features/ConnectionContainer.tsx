import React, { useState } from 'react';

export default function ConnectionContainer() {
  const [connectionName, setConnectionName] = useState('');
  const [devopsOrg, setDevopsOrg] = useState('');
  const [devopsProject, setDevopsProject] = useState('');
  const [authnAuth, setAuthnAuth] = useState('');

  const handleConnectionNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setConnectionName(event.target.value);
  };

  const handleDevopsOrgChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setDevopsOrg(event.target.value);
  };

  const handleDevopsProjectChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setDevopsProject(event.target.value);
  };

  const handleAuthnAuthChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setAuthnAuth(event.target.value);
  };

  const isFormValid = () => {
    return connectionName !== '' && devopsOrg !== '' && devopsProject !== '' && authnAuth !== '';
  };

  const handleConnectClick = () => {
    if (isFormValid()) {
      //
    } else {
      //
    }
  };

  return (
    <div className="control-pane">
      <div className="fieldset-container">
      <fieldset>
        <legend>DevOps Work Items</legend>
        <table>
          <tbody>
            <tr>
              <td className="form-label">Connection details</td>
              <td></td>
            </tr>
            <tr>
              <td>
                Connection name <br />
                <input
                  type="text"
                  name="connection_name"
                  value={connectionName}
                  onChange={handleConnectionNameChange}
                />
              </td>
              <td>
                DevOps Project <br />
                <input
                  type="text"
                  name="devops_project"
                  value={devopsProject}
                  onChange={handleDevopsProjectChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                DevOps Organisation <br />
                <input
                  type="text"
                  name="devops_org"
                  value={devopsOrg}
                  onChange={handleDevopsOrgChange}
                />
              </td>
              <td>
                Authentication Token <br />
                <input
                  type="text"
                  name="authnAuth"
                  value={authnAuth}
                  onChange={handleAuthnAuthChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button
                  className={`connBtn ${isFormValid() ? '' : 'disabled'}`}
                  onClick={handleConnectClick}
                  disabled={!isFormValid()}
                >
                  Connect
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    </div>
    </div>
  );
}
