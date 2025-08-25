


export async function GET(request: Request) {
  try {
    // Obtener el email desde los query parameters
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const uri = process.env.SF_CMS_URL || '';
    
    if (!email) {
      return Response.json(
        { success: false, message: 'Email parameter is required' },
        { status: 400 }
      );
    }
    
    const response = await fetch(`${uri}/Controllers/LDAPUserRest/LDAPUserRestService.svc/get-photo/${email}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });
 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
 
    const data = await response.json();
    return Response.json(data);
  } catch (error: any) {
    console.error('Error fetching LDAP profile:', error);
    
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}