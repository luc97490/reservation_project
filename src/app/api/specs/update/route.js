export async function PUT(request) {
  try {
    const { id, type, modele } = await request.json();

    const updatedSpecs = await prisma.specifications.update({
      where: { id },
      data: {
        type,
        modele,
      },
    });

    return NextResponse.json({ updatedSpecs });
  } catch (err) {
    console.error("Error updating specs:", err);
    return NextResponse.error("Failed to update specs");
  }
}
