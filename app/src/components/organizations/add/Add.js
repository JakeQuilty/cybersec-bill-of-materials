import React, { useState } from 'react'
import { add } from '../../../api/org'
import { useDispatch } from 'react-redux'
import { addToOrgList } from '../../../features/orgsSlice'
import {
    CContainer,
    CCol,
    CRow,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CButton,
    CCard,
    CCardBody,
} from '@coreui/react'

const New = () => {
    const [orgName, setOrg] = useState("")
    const [oauthToken, setToken] = useState("")
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        add({name: orgName, authToken: oauthToken}).then( res => {
            notification(res)
            updateOrgList(res)
        })
    };

    const notification = (response) => {
        let message = ""
        if (response.status === 200) {
            message = response.name + " added succesfully!";
        } else {
            message = "Error: " + response.error
        }
        alert(message);
    }
    
    const updateOrgList = (response) => {
        if (response.status === 200) {
            dispatch(addToOrgList({id: response.id, orgName: response.orgName}))
        }
    }

    return (
        <>
            <CContainer>
                <CRow alignHorizontal="center">
                    <CCol sm="8">
                        <CCard>
                            <CCardBody>
                                    <CForm onSubmit={submitHandler} action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                        <CFormGroup>
                                        <CLabel htmlFor="text-input">Organization</CLabel>
                                        <CInput
                                            id="text-input"
                                            name="organization-input"
                                            placeholder="GitHub Organization"
                                            value={orgName}
                                            onChange={(e) => {
                                                setOrg(e.target.value);
                                            }}
                                        />
                                        <CLabel htmlFor="password-input">OAuth Token</CLabel>
                                        <CInput
                                            type="password"
                                            id="password-input"
                                            name="oauthtoken-input"
                                            placeholder="GitHub OAuth Token"
                                            value={oauthToken}
                                            onChange={(e) => {
                                                setToken(e.target.value);
                                            }}
                                        />
                                        </CFormGroup>
                                        <CRow alignHorizontal="center">
                                            <CButton type="submit" color="info" size="lg" className="m-2">Add</CButton>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </>
    )
}

export default New;