
import  AvailableActions  from '../_components/AvailableActions'
import  OldDocumentsTable  from '../_components/OldDocumentsTable'
import UploadOldDoc from '../_components/UploadOldDoc'
export const Dashboard= () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-[#0E708B]">Document Management</h1>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E708B]">Available Actions</h2>
                <AvailableActions />
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E708B]">Old Documents</h2>
                <OldDocumentsTable />
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-[#0E708B]">Upload Old Document</h2>
                <UploadOldDoc />
            </section>
        </div>
    )
}

