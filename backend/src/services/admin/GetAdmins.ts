import { Admin } from "../../entities/Admin";
import { UserRole } from "../../entities/UserBase";
import { firestore } from "../../firebase/firebase-config";
import { USER_COLLECTION } from "../../utils/Constants";

async function getAdmins() : Promise<Admin[]> {
    const adminCollection = firestore.collection(USER_COLLECTION);
  
    try {
      const admins : Admin[] = []
  
      const querySnapshot = await adminCollection.where('role', '==', UserRole.Admin).get()

      console.log("ADMIN SNAPSHOT: ", querySnapshot);
  
      for (const doc of querySnapshot.docs) {
        console.log("Admin " + doc.id + ":")
  
        let currentAdmin = new Admin(doc.id, doc.data().email, doc.data().name);
        currentAdmin.printDetails();
        admins.push(currentAdmin);
      }
  
      return admins
    } catch (error){
        console.error('Erro ao acessar o Firestore:', error);
        throw error;
    }
}

export { getAdmins }