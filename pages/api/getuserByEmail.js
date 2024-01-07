// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {getAuth} from 'firebase-admin/auth';
import {app} from '@/lib/firebase-admin';
export default async function handler(req, res) {
    const auth=getAuth(app)
    if(req.method=='POST')
    {
      const response = JSON.parse(req.body);
      const data=await auth.getUserByEmail(response.email);
      // console.log(data);
      res.status(200).json(data);
    }
    res.status(200).json({"message":"hello"});
  }
  