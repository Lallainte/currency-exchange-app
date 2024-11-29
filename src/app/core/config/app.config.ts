/**
 * List of Application constants
 */
export const AppConstant = {
    userSessionKey: btoa('currSession'),
    userSession: btoa('currUser'),
    companyId: btoa('companyId'),
    tenantId: btoa('tenantId'),
    info: btoa('info'),
    myEmployee: btoa('myEmployee'),
    menuAdmin: btoa('menuAdmin'),
    menuEss: btoa('menuEss'),
    menuMss: btoa('menuMss'),
    accessAdmin: btoa('accessAdmin'),
    accessEss: btoa('accessEss'),
    savedUser: btoa('savedUser'),
    accessMss: btoa('accessMss'),
    defaultFilter: btoa('defaultFilter'),
    resetPasswordMessage: 'Apakah Anda yakin akan <b>mereset</b> password?',
    prepaymentMessage: 'Apakah Anda yakin akan melanjutkan <b>pembayaran</b>?',
    activateMessage:
        'Apakah Anda yakin akan <b>mengaktifkan</b> <br> pengguna ini?',
    deactivateMessage:
        'Apakah Anda yakin akan <b>menonaktfikan</b> <br> pengguna ini?',
    paidMessage: 'Apakah Anda yakin untuk <b>membayarkan</b> data ini?',
    reopenMessage: 'Apakah Anda yakin akan <b>membuka kembali</b> proses?',
    extendMessage: 'Apakah Anda yakin akan <b>memperpanjang?</b>',
    terminateMessage: 'Apakah Anda yakin akan <b>memberhentikan?</b>',
    closeMessage: 'Apakah Anda yakin akan <b>menyelesaikan</b> proses ?',
    rollbackMessage: 'Apakah Anda yakin akan <b>membalikan</b> proses?',
    cancelMessage: 'Apakah Anda yakin untuk <b>membatalkan</b> data ini?',
    kembaliMessage: 'Apakah Anda yakin akan <b>kembali</b> ke halaman utama?',
    processMessage: 'Apakah Anda yakin akan <b>memproses</b>?',
    rejectMessage: 'Apakah Anda yakin untuk <b>menolak</b> data ini?',
    sendMessage: 'Apakah Anda yakin untuk <b>mengaktivasi premium</b>?',
    renewMessage: 'Apakah Anda yakin untuk <b>perpanjang premium</b>?',
    approveMessage: 'Apakah Anda yakin untuk <b>menyetujui</b> data ini?',
    updateMessage: 'Apakah Anda yakin akan <b>memperbarui</b>?',
    absenMessage:
        'Apakah anda yakin akan mengganti status <br> kehadiran, menjadi <b>Absen</b>?',
    deleteMessage: 'Apakah Anda yakin akan <b>menghapus</b> data ini?',
    earlyOutMessage:
        'Apakah Anda yakin akan mengganti status <br> kehadiran, menjadi <b>Pulang Cepat</b>?',
    lateMessage:
        'Apakah Anda yakin akan mengganti status <br> kehadiran, menjadi <b>Terlambat</b>?',
    presentMessage:
        'Apakah Anda yakin akan mengganti status <br> kehadiran, menjadi <b>Hadir</b>?',
    ApprovedMessage: 'Apakah Anda yakin untuk <b>menyetujui</b> data ini?',
    RejectedMessage: 'Apakah Anda yakin untuk <b>menolak</b> data ini?',
    PaidMessage: 'Apakah Anda yakin untuk <b>membayarkan</b> data ini?',
    changeBalance:
        'Perubahan persentasi pengajuan gaji instan berlaku di bulan berikutnya.',
    month: [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ],
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50],
    rowsPerPageTimesheet: 50,
    rowsPerPageOptionsTimesheet: [50, 100, 150],
    rowsCard: 9,
    rowsCardOptions: [9, 18, 27],
};

export interface AppConfig {
    inputStyle?: string;
    dark?: boolean;
    theme?: string;
    ripple?: boolean;
    loading?: boolean;
}
