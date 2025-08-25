export async function GET() {
  const uri = process.env.SF_CMS_URL || '';
  try {
    const response = await fetch(`${uri}/Controllers/LDAPUserRest/LDAPUserRestService.svc/users`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })
 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
 
    const data = await response.json();

    return Response.json(data)
  } catch (error: any) {
    console.error('Error fetching LDAP users:', error)
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}