import React, { useState } from 'react';

export default function ConnectionContainer() {
  const [connectionName, setConnectionName] = useState('')
  const [devopsOrg, setDevopsOrg] = useState('')
  const [devopsProject, setDevopsProject] = useState('')
  const [authnAuth, setAuthnAuth] = useState('')

  const handleConnectionNameChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setConnectionName(event.target.value)
  }

  const handleDevopsOrgChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setDevopsOrg(event.target.value)
  }

  const handleDevopsProjectChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setDevopsProject(event.target.value)
  }

  const handleAuthnAuthChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setAuthnAuth(event.target.value)
  }

  const isFormValid = () => {
    return connectionName !== '' && devopsOrg !== '' && devopsProject !== '' && authnAuth !== '';
  }

  const handleConnectClick = () => {
    if (isFormValid()) {
      //
    } else {
      //
    }
  }

  return (
    <div className='dev-container'>
      <fieldset>
      <legend>DevOps Work Items</legend>
      <table>
      <tr>
          <td>Connetion details</td>
          <td></td>
        </tr>
        <tr>
          <td>Connection name</td>
          <td><input type="text" name="conection_name" value={connectionName} onChange={handleConnectionNameChange}/></td>
        </tr>
        <tr>
          <td>DevOps Organisation</td>
          <td><input type="text" name="devops_org" value={devopsOrg} onChange={handleDevopsOrgChange}/></td>
        </tr>
        <tr>
          <td>DevOps Project</td>
          <td><input type="text" name="devops_project" value={devopsProject} onChange={handleDevopsProjectChange}/></td>
        </tr>
        <tr>
          <td>Authentication and Authorization</td>
          <td><input type="text" name="authnAuth" value={authnAuth} onChange={handleAuthnAuthChange}/></td>
        </tr>
        <tr>
          <td></td>
          <td><button className='connBtn'onClick={handleConnectClick} disabled={!isFormValid()}>Connect</button></td>
        </tr>
      </table>
    </fieldset>
    </div>
  )
}
